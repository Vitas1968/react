import { useState, type SubmitEvent } from 'react';
import './CatalogPage.css';

export function CatalogPage() {
  const [query, setQuery] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Поисковый запрос:', query);
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

          <button className="catalog-search-form__button" type="submit">
            Найти
          </button>
        </div>
      </form>
    </main>
  );
}
