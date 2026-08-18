import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main>
      <h1>Страница не найдена</h1>
      <p>Такого адреса в приложении нет.</p>

      <Link to="/">Вернуться в каталог</Link>
    </main>
  );
}
