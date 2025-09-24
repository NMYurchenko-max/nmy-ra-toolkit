/**
 * Карусель для отображения фильмов (альтернативная реализация)
 * @fileoverview src/components/shared/widgets/MovieCarousel.tsx
 * @module components/shared/widgets/MovieCarousel
 * @description
 * Альтернативная реализация карусели фильмов с использованием Tailwind CSS
 * вместо CSS модулей. Этот компонент не используется в основном приложении,
 * но может служить примером альтернативного подхода к созданию карусели.
 *
 * Особенности:
 * - Использование Tailwind CSS классов
 * - Упрощенная структура компонента
 * - Встроенная навигация к деталям фильма
 * - Опциональная кнопка удаления
 * - Адаптивное отображение карточек
 *
 * @note Этот компонент не используется в основном приложении.
 * Основная карусель реализована в FavoritesCarousel.tsx с CSS модулями.
 *
 * @example
 * ```tsx
 * <MovieCarousel
 *   movies={moviesList}
 *   onRemoveMovie={(movieId) => removeMovie(movieId)}
 * />
 * ```
 */

import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/services/types/movie';

/**
 * Свойства для компонента MovieCarousel
 * @interface MovieCarouselProps
 * @description
 * Определяет интерфейс для свойств компонента карусели фильмов.
 *
 * @property {Movie[]} movies - Массив фильмов для отображения в карусели
 * @property {(movieId: string) => void} [onRemoveMovie] - Опциональный обработчик удаления фильма
 *
 * @example
 * ```tsx
 * const props: MovieCarouselProps = {
 *   movies: moviesList,
 *   onRemoveMovie: (movieId) => dispatch(removeMovie(movieId))
 * };
 * ```
 */
interface MovieCarouselProps {
  movies: Movie[];
  onRemoveMovie?: (movieId: string) => void;
}

/**
 * Шаблон элемента карусели
 * @function movieTemplate
 * @description
 * Создает JSX элемент карточки фильма для отображения в карусели.
 * Включает постер, название, год и опциональную кнопку удаления.
 *
 * @param {Movie} movie - Объект фильма для отображения
 * @param {(movieId: string) => void} [onRemoveMovie] - Обработчик удаления фильма
 * @param {(path: string) => void} [navigate] - Функция навигации
 * @returns {JSX.Element} Карточка фильма для карусели
 *
 * @example
 * const card = movieTemplate(movie, onRemoveMovie, navigate);
 */
const movieTemplate = (movie: Movie, onRemoveMovie?: (movieId: string) => void, navigate?: (path: string) => void) => {
  const handleCardClick = () => {
    navigate?.(`/movie/${movie.imdbID}`);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveMovie?.(movie.imdbID);
  };

  return (
    <div className="p-2">
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={handleCardClick}
      >
        {onRemoveMovie && (
          <div className="absolute top-2 right-2 z-10">
            <Button
              icon="pi pi-times"
              severity="danger"
              size="small"
              rounded
              text
              onClick={handleRemoveClick}
              tooltip="Удалить из избранного"
            />
          </div>
        )}

        <div className="text-center">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-48 object-cover rounded mb-3"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded mb-3 flex items-center justify-center">
              <span className="text-gray-500">Нет постера</span>
            </div>
          )}

          <h4 className="font-semibold text-sm line-clamp-2 mb-1">
            {movie.Title}
          </h4>
          <p className="text-gray-600 text-xs">{movie.Year}</p>
        </div>
      </Card>
    </div>
  );
};

/**
 * Компонент карусели фильмов (альтернативная реализация)
 * @component
 * @description
 * Рендерит карусель с фильмами с использованием PrimeReact Carousel и Tailwind CSS.
 * Это альтернативная реализация карусели, не используемая в основном приложении.
 *
 * Функциональность:
 * - Адаптивное количество карточек в зависимости от экрана
 * - Автоматическая навигация к деталям фильма
 * - Опциональная кнопка удаления фильма
 * - Обработка пустого состояния
 * - Использование Tailwind CSS для стилизации
 *
 * @param {MovieCarouselProps} props - Свойства компонента
 * @param {Movie[]} props.movies - Массив фильмов для отображения
 * @param {(movieId: string) => void} [props.onRemoveMovie] - Обработчик удаления фильма
 *
 * @returns {React.JSX.Element} Карусель с фильмами или сообщение о пустом списке
 *
 * @example
 * ```tsx
 * const handleRemoveMovie = (movieId: string) => {
 *   dispatch(removeMovie(movieId));
 * };
 *
 * <MovieCarousel
 *   movies={movies}
 *   onRemoveMovie={handleRemoveMovie}
 * />
 * ```
 */
const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onRemoveMovie }) => {
  const navigate = useNavigate();

  if (movies.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🎬</div>
        <p className="text-gray-600">Нет избранных фильмов</p>
      </div>
    );
  }

  return (
    <div className="movie-carousel">
      <Carousel
        value={movies}
        numVisible={4}
        numScroll={1}
        responsiveOptions={[
          {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
          },
          {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
          },
          {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
          }
        ]}
        itemTemplate={(movie) => movieTemplate(movie, onRemoveMovie, navigate)}
        showIndicators={movies.length > 4}
        showNavigators={movies.length > 1}
        circular={false}
        autoplayInterval={3000}
        className="custom-carousel"
      />
    </div>
  );
};

export default MovieCarousel;
