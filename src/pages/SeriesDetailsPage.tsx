import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShow } from '../api/tvMaze';
import type { TvMazeShow } from '../types/TvMaze';
import './SeriesDetailsPage.css';

function getPlainText(html: string): string {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
}

export function SeriesDetailsPage() {
  const { seriesId } = useParams();
  const showId = Number(seriesId);
  const isValidShowId = Number.isInteger(showId);

  const [show, setShow] = useState<TvMazeShow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidShowId) {
      return;
    }

    async function loadShow() {
      try {
        const loadedShow = await getShow(showId);
        setShow(loadedShow);
      } catch {
        setErrorMessage('Не удалось загрузить детали сериала.');
      } finally {
        setIsLoading(false);
      }
    }

    loadShow();
  }, [isValidShowId, showId]);

  if (!isValidShowId) {
    return <main className="series-details-page">Некорректный идентификатор сериала.</main>;
  }

  if (isLoading) {
    return <main className="series-details-page">Загрузка...</main>;
  }

  if (errorMessage || !show) {
    return <main className="series-details-page">{errorMessage ?? 'Сериал не найден.'}</main>;
  }

  return (
    <main className="series-details-page">
      <section className="series-details">
        {show.image ? (
          <img
            className="series-details__image"
            src={show.image.medium}
            alt={`Постер сериала «${show.name}»`}
          />
        ) : (
          <div className="series-details__image-placeholder">Нет постера</div>
        )}

        <div>
          <h1 className="series-details__title">{show.name}</h1>

          <p>
            Рейтинг: <strong>{show.rating.average ?? '—'}</strong>
          </p>

          <p>Премьера: {show.premiered ?? '—'}</p>

          {show.genres.length > 0 && <p>Жанры: {show.genres.join(', ')}</p>}

          <p className="series-details__summary">
            {show.summary ? getPlainText(show.summary) : 'Описание отсутствует.'}
          </p>
        </div>
      </section>
    </main>
  );
}
