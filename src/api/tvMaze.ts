import type { TvMazeSearchResult, TvMazeShow } from '../types/TvMaze';

const API_BASE_URL = 'https://api.tvmaze.com';

export async function searchShows(query: string): Promise<TvMazeSearchResult[]> {
  const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`TVMaze вернул ошибку HTTP ${response.status}`);
  }

  return (await response.json()) as TvMazeSearchResult[];
}

export async function getShow(showId: number): Promise<TvMazeShow> {
  const response = await fetch(`${API_BASE_URL}/shows/${showId}`);

  if (!response.ok) {
    throw new Error(`TVMaze вернул ошибку HTTP ${response.status}`);
  }

  return (await response.json()) as TvMazeShow;
}
