import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AppHeader } from './components/app_header/AppHeader';
import { NotFoundPage } from './pages/NotFoundPage';
import { SeriesDetailsPage } from './pages/SeriesDetailsPage';
import type { TvMazeShow } from './types/TvMaze';

function App() {
  const [favorites, setFavorites] = useState<TvMazeShow[]>([]);

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
          element={<CatalogPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
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
