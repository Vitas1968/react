import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AppHeader } from './components/app_header/AppHeader';
import { NotFoundPage } from './pages/NotFoundPage';
import { SeriesDetailsPage } from './pages/SeriesDetailsPage';
import type { TvMazeSearchResult, TvMazeShow } from './types/TvMaze';

const STORAGE_KEYS = {
  query: 'series-catalog-query',
  submittedQuery: 'series-catalog-submitted-query',
  results: 'series-catalog-results',
  favorites: 'series-catalog-favorites',
} as const;

function readStoredJson<T>(key: string, fallback: T): T {
  const storedValue = sessionStorage.getItem(key);

  if (storedValue === null) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return fallback;
  }
}

function App() {
  const [favorites, setFavorites] = useState<TvMazeShow[]>(() =>
    readStoredJson(STORAGE_KEYS.favorites, []),
  );
  const [query, setQuery] = useState(() => sessionStorage.getItem(STORAGE_KEYS.query) ?? '');
  const [submittedQuery, setSubmittedQuery] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.submittedQuery) ?? '',
  );
  const [results, setResults] = useState<TvMazeSearchResult[]>(() =>
    readStoredJson(STORAGE_KEYS.results, []),
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.query, query);
  }, [query]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.submittedQuery, submittedQuery);
  }, [submittedQuery]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.results, JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(show: TvMazeShow) {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some((favorite) => favorite.id === show.id);

      if (isFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== show.id);
      }

      return [...currentFavorites, show];
    });
  }

  return (
    <>
      <AppHeader />

      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage
              query={query}
              submittedQuery={submittedQuery}
              results={results}
              favorites={favorites}
              onQueryChange={setQuery}
              onSubmittedQueryChange={setSubmittedQuery}
              onResultsChange={setResults}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/series/:seriesId" element={<SeriesDetailsPage />} />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
