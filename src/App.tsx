import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AppHeader } from './components/app_header/AppHeader';
import { NotFoundPage } from './pages/NotFoundPage';
import { SeriesDetailsPage } from './pages/SeriesDetailsPage';

function App() {
  return (
    <>
      <AppHeader />

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/series/:seriesId" element={<SeriesDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
