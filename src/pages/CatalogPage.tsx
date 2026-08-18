import { useState, type SubmitEvent } from 'react';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Поисковый запрос:', query);
  }

  return (
    <main>
      <h1>Каталог сериалов</h1>
      <p>Найдите сериал по названию.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="query">Название сериала</label>

        <input
          id="query"
          name="query"
          type="search"
          placeholder="Например, Breaking Bad"
          required
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Найти</button>
      </form>
    </main>
  );
}
