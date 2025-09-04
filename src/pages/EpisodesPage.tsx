import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getEpisodes } from "@/services/episodes";
import type { Episode, EpisodeFilters as EpisodeFiltersType, EpisodesResponse } from "@/types/episode";
import { EpisodeFilters } from "@/components/episodes/EpisodeFilter";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { PaginationComponent } from "@/components/episodes/EpisodePagination";

export function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [info, setInfo] = useState<EpisodesResponse["info"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Current filters from URL
  const currentFilters: EpisodeFiltersType = useMemo(() => ({
    name: searchParams.get("name") || undefined,
    episode: searchParams.get("episode") || undefined, // like "S01E01"
    page: Number(searchParams.get("page")) || 1,
  }), [searchParams]);

  // ✅ API filters
  const apiFilters = useMemo(() => {
    const filters: EpisodeFiltersType = {};
    if (currentFilters.name) filters.name = currentFilters.name;
    if (currentFilters.episode) filters.episode = currentFilters.episode;
    if (currentFilters.page) filters.page = currentFilters.page;
    return filters;
  }, [currentFilters]);

  // ✅ Fetch episodes when filters change
  useEffect(() => {
    setLoading(true);

    getEpisodes(apiFilters)
      .then((data) => {
        setEpisodes(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        console.error("Failed to fetch episodes:", error);
        setEpisodes([]);
        setInfo(null);
      })
      .finally(() => setLoading(false));
  }, [apiFilters]);

  // ✅ Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1 || (info && newPage > info.pages)) return;

    const newParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      newParams.set("page", String(newPage));
    } else {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  }, [searchParams, info, setSearchParams]);

  // ✅ Handle filter change
  const handleFiltersChange = useCallback((newFilters: EpisodeFiltersType) => {
    const params = new URLSearchParams();

    if (newFilters.name) params.set("name", newFilters.name);
    if (newFilters.episode) params.set("episode", newFilters.episode);

    setSearchParams(params); // reset page to 1
  }, [setSearchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Episodes</h1>

      <EpisodeFilters filters={currentFilters} onChange={handleFiltersChange} />

      {loading && <p>Loading...</p>}
      {!loading && episodes.length === 0 && <p>No episodes found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {episodes.map((ep) => (
          <div 
            key={ep.id} 
            onClick={() => navigate(`/episode/${ep.id}`)} 
            className="cursor-pointer"
          >
            <EpisodeCard episode={ep} />
          </div>
        ))}
      </div>

      {info && (
        <div className="mt-6">
          <PaginationComponent
            currentPage={currentFilters.page || 1}
            totalPages={info.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
