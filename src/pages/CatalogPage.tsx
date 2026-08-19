import { useState, type SubmitEvent } from 'react';
import './CatalogPage.css';
import { searchShows } from '../api/tvMaze';
import type { TvMazeSearchResult } from '../types/TvMaze';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [results, setResults] = useState<TvMazeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    setSubmittedQuery(normalizedQuery);
    setIsLoading(true);
    try {
      const results = await searchShows(normalizedQuery);
      setResults(results);
    } catch (error) {
      console.error('Не удалось выполнить поиск:', error);
      setResults([]);
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
            onChange={(event) => setQuery(event.target.value)}
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
            {results.map((result) => (
              <li className="search-results__card" key={result.show.id}>
                {result.show.image ? (
                  <img
                    className="search-results__image"
                    src={result.show.image.medium}
                    alt={`Постер сериала «${result.show.name}»`}
                  />
                ) : (
                  <div className="search-results__image-placeholder">Нет постера</div>
                )}

                <h3 className="search-results__title">{result.show.name}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
