import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import { searchShows } from '../api/tvMaze';
import type { TvMazeSearchResult, TvMazeShow } from '../types/TvMaze';
import './CatalogPage.css';

type CatalogPageProps = {
  query: string;
  submittedQuery: string;
  results: TvMazeSearchResult[];
  favorites: TvMazeShow[];
  onQueryChange: (value: string) => void;
  onSubmittedQueryChange: (value: string) => void;
  onResultsChange: (results: TvMazeSearchResult[]) => void;
  onToggleFavorite: (show: TvMazeShow) => void;
};

export function CatalogPage({
  query,
  submittedQuery,
  results,
  favorites,
  onQueryChange,
  onSubmittedQueryChange,
  onResultsChange,
  onToggleFavorite,
}: CatalogPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    onSubmittedQueryChange(normalizedQuery);
    setIsLoading(true);

    try {
      const foundShows = await searchShows(normalizedQuery);
      onResultsChange(foundShows);
    } catch (error) {
      console.error('Не удалось выполнить поиск:', error);
      onResultsChange([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="catalog-page">
      <h1 className="catalog-page__title">Каталог сериалов</h1>
      <p className="catalog-page__description">Найдите сериал по названию.</p>

      <form className="catalog-search-form" onSubmit={handleSubmit}>
        <label className="catalog-search-form__label" htmlFor="query">
          Название сериала
        </label>

        <div className="catalog-search-form__controls">
          <input
            className="catalog-search-form__input"
            id="query"
            name="query"
            type="search"
            placeholder="Например, Breaking Bad"
            required
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />

          <button className="catalog-search-form__button" type="submit" disabled={isLoading}>
            {isLoading ? 'Ищем…' : 'Найти'}
          </button>
        </div>
      </form>

      {submittedQuery && (
        <p className="catalog-page__result-message">
          Будем искать сериал: <strong>{submittedQuery}</strong>
        </p>
      )}

      {results.length > 0 && (
        <section className="search-results">
          <h2>Результаты поиска</h2>

          <ul className="search-results__list">
            {results.map((result) => {
              const { show } = result;
              const isFavorite = favorites.some((favorite) => favorite.id === show.id);

              return (
                <li className="search-results__card" key={show.id}>
                  <button
                    className="search-results__favorite-button"
                    type="button"
                    aria-label={
                      isFavorite
                        ? `Удалить «${show.name}» из избранного`
                        : `Добавить «${show.name}» в избранное`
                    }
                    aria-pressed={isFavorite}
                    onClick={() => onToggleFavorite(show)}
                  >
                    {isFavorite ? '♥' : '♡'}
                  </button>

                  <Link className="search-results__poster-link" to={`/series/${show.id}`}>
                    {show.image ? (
                      <img
                        className="search-results__image"
                        src={show.image.medium}
                        alt={`Постер сериала «${show.name}»`}
                      />
                    ) : (
                      <div className="search-results__image-placeholder">Нет постера</div>
                    )}
                  </Link>

                  <h3 className="search-results__title">{show.name}</h3>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
