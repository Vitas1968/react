import type { FormEvent } from 'react';

export function CatalogPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        />

        <button type="submit">Найти</button>
      </form>
    </main>
  );
}
