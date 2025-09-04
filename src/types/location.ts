// src/types/location.ts
// src/types/location.ts
import type { ApiInfo } from "./character";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // array of Character URLs
  url: string;
  created: string;
}

export interface LocationsResponse {
  info: ApiInfo;
  results: Location[];
}

export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
  page?: number;
}
