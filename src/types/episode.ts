// src/types/episode.ts
import type { ApiInfo } from "./character";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // e.g. "S01E01"
  characters: string[]; // array of Character URLs
  url: string;
  created: string;
}

export interface EpisodesResponse {
  info: ApiInfo;
  results: Episode[];
}

export interface EpisodeFilters {
  name?: string;
  episode?: string; // e.g. "S01E01"
  page?: number;
}
