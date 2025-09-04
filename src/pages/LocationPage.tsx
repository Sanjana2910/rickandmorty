import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getLocations } from "@/services/locations";
import type { Location, LocationFilters as LocationFiltersType, LocationsResponse } from "@/types/location";
import { LocationFilters } from "@/components/locations/LocationFilter";
import { LocationCard } from "@/components/locations/LocationCard";
import { AppPagination } from "@/components/locations/LocationPagination";
// import { AppPagination } from "@/components/common/Pagination"; // generic pagination

export function LocationPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [info, setInfo] = useState<LocationsResponse["info"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Current filters from URL
  const currentFilters: LocationFiltersType = useMemo(() => ({
    name: searchParams.get("name") || undefined,
    type: searchParams.get("type") || undefined,
    dimension: searchParams.get("dimension") || undefined,
    page: Number(searchParams.get("page")) || 1,
  }), [searchParams]);

  // Build API filters
  const apiFilters = useMemo(() => {
    const filters: LocationFiltersType = {};
    if (currentFilters.name) filters.name = currentFilters.name;
    if (currentFilters.type) filters.type = currentFilters.type;
    if (currentFilters.dimension) filters.dimension = currentFilters.dimension;
    if (currentFilters.page) filters.page = currentFilters.page;
    return filters;
  }, [currentFilters]);

  // Fetch locations
  useEffect(() => {
    setLoading(true);
    getLocations(apiFilters)
      .then((data) => {
        setLocations(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
        setLocations([]);
        setInfo(null);
      })
      .finally(() => setLoading(false));
  }, [apiFilters]);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1 || (info && newPage > info.pages)) return;
    const newParams = new URLSearchParams(searchParams);
    if (newPage > 1) newParams.set("page", String(newPage));
    else newParams.delete("page");
    setSearchParams(newParams);
  }, [searchParams, info, setSearchParams]);

  // Handle filters change
  const handleFiltersChange = useCallback((newFilters: LocationFiltersType) => {
    const params = new URLSearchParams();
    if (newFilters.name) params.set("name", newFilters.name);
    if (newFilters.type) params.set("type", newFilters.type);
    if (newFilters.dimension) params.set("dimension", newFilters.dimension);
    // Reset to page 1
    setSearchParams(params);
  }, [setSearchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>

      <LocationFilters filters={currentFilters} onChange={handleFiltersChange} />

      {loading && <p>Loading...</p>}
      {!loading && locations.length === 0 && <p>No locations found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>

      {info && (
        <div className="mt-6">
          <AppPagination
            currentPage={currentFilters.page || 1}
            totalPages={info.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
