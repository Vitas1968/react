import { Link, Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';

function App() {
  return (
    <>
      <header className="app-header">
        <nav className="app-navigation" aria-label="Основная навигация">
          <Link className="app-navigation__link" to="/">
            Каталог
          </Link>

          <Link className="app-navigation__link" to="/favorites">
            Избранное
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
