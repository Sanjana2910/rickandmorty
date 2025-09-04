// src/services/characters.ts
import type { Character, CharacterFilters, CharactersResponse } from "@/types/character";
import { api } from "./api";

// Get paginated list of characters with optional filters
export async function getCharacters(filters: CharacterFilters = {}): Promise<CharactersResponse> {
  const response = await api.get<CharactersResponse>("/character", {
    params: filters,
  });
  return response.data;
}

// Get details of a single character by ID
export async function getCharacterById(id: number): Promise<Character> {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
}