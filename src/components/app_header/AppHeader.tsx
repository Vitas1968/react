import { Link } from 'react-router-dom';
import './AppHeader.css';

export function AppHeader() {
  return (
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
  );
}
