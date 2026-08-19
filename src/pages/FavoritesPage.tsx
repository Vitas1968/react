import { Link } from 'react-router-dom';
import type { TvMazeShow } from '../types/TvMaze';

type FavoritesPageProps = {
  favorites: TvMazeShow[];
  onToggleFavorite: (show: TvMazeShow) => void;
};

export function FavoritesPage({ favorites, onToggleFavorite }: FavoritesPageProps) {
  return (
    <main>
      <h1>Избранное</h1>

      {favorites.length === 0 ? (
        <p>В избранном пока нет сериалов.</p>
      ) : (
        <ul>
          {favorites.map((show) => (
            <li key={show.id}>
              <Link to={`/series/${show.id}`}>
                {show.image ? (
                  <img src={show.image.medium} alt={`Постер сериала «${show.name}»`} />
                ) : (
                  <span>Нет постера</span>
                )}
              </Link>

              <h2>{show.name}</h2>

              <button type="button" onClick={() => onToggleFavorite(show)}>
                Убрать из избранного
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
