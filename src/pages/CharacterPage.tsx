import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCharacters } from "@/services/characters";
import type { Character, CharacterFilters as CharacterFiltersType, CharactersResponse } from "@/types/character";
import { CharacterFilters } from "@/components/characters/CharacterFilter";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { CharacterPagination } from "@/components/characters/CharacterPagination";

export function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<CharactersResponse["info"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Memoize current filters from URL to prevent unnecessary recreations
  const currentFilters: CharacterFiltersType = useMemo(() => ({
    name: searchParams.get("name") || undefined,
    status: (searchParams.get("status") as CharacterFiltersType["status"]) || undefined,
    species: searchParams.get("species") || undefined,
    gender: (searchParams.get("gender") as CharacterFiltersType["gender"]) || undefined,
    page: Number(searchParams.get("page")) || 1,
  }), [searchParams]);

  // Memoize API filters to prevent unnecessary recreations
  const apiFilters = useMemo(() => {
    const filters: CharacterFiltersType = {};
    if (currentFilters.name) filters.name = currentFilters.name;
    if (currentFilters.status) filters.status = currentFilters.status;
    if (currentFilters.species) filters.species = currentFilters.species;
    if (currentFilters.gender) filters.gender = currentFilters.gender;
    if (currentFilters.page) filters.page = currentFilters.page;
    return filters;
  }, [currentFilters]);

  // Fetch characters whenever API filters change
  useEffect(() => {
    setLoading(true);
    
    getCharacters(apiFilters)
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        console.error("Failed to fetch characters:", error);
        setCharacters([]);
        setInfo(null);
      })
      .finally(() => setLoading(false));
  }, [apiFilters]);

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

  const handleFiltersChange = useCallback((newFilters: CharacterFiltersType) => {
    const params = new URLSearchParams();
    
    // Add non-empty filters to URL
    if (newFilters.name) params.set("name", newFilters.name);
    if (newFilters.status) params.set("status", newFilters.status);
    if (newFilters.species) params.set("species", newFilters.species);
    if (newFilters.gender) params.set("gender", newFilters.gender);
    // Always reset to page 1 when filters change
    
    setSearchParams(params);
  }, [setSearchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>

      <CharacterFilters filters={currentFilters} onChange={handleFiltersChange} />

      {loading && <p>Loading...</p>}

      {!loading && characters.length === 0 && <p>No characters found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <div key={char.id} onClick={() => navigate(`/character/${char.id}`)} className="cursor-pointer">
            <CharacterCard character={char} />
          </div>
        ))}
      </div>

      {info && (
        <div className="mt-6">
          <CharacterPagination
            currentPage={currentFilters.page || 1}
            totalPages={info.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}