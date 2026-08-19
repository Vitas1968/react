import type { TvMazeSearchResult } from '../types/TvMaze';

const API_BASE_URL = 'https://api.tvmaze.com';

export async function searchShows(query: string): Promise<TvMazeSearchResult[]> {
  const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`TVMaze вернул ошибку HTTP ${response.status}`);
  }

  return (await response.json()) as TvMazeSearchResult[];
}
