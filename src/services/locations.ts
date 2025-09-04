// src/services/locations.ts
import type { Location, LocationFilters, LocationsResponse } from "@/types/location";
import { api } from "./api";

// Get paginated list of locations with optional filters
export async function getLocations(filters: LocationFilters = {}): Promise<LocationsResponse> {
  const response = await api.get<LocationsResponse>("/location", {
    params: filters,
  });
  return response.data;
}

// Get details of a single location by ID
export async function getLocationById(id: number): Promise<Location> {
  const response = await api.get<Location>(`/location/${id}`);
  return response.data;
}
