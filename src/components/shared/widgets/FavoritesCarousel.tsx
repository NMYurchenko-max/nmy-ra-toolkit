/**
 * Карусель для отображения избранных фильмов
 * @fileoverview src/components/shared/widgets/FavoritesCarousel.tsx
 * @module components/shared/widgets/FavoritesCarousel
 * @description
 * Компонент карусели для отображения избранных фильмов с использованием
 * PrimeReact Carousel. Предоставляет красивый и интерактивный способ
 * просмотра сохраненных фильмов с навигацией и автопрокруткой.
 *
 * Особенности:
 * - Адаптивное отображение карточек фильмов (responsiveOptions)
 * - Автоматическая прокрутка с настраиваемой скоростью
 * - Навигация с точками и стрелками
 * - Поддержка пустого состояния
 * - Интеграция с MovieCard компонентом
 *
 * @example
 * ```tsx
 * <FavoritesCarousel
 *   favorites={favoriteMovies}
 *   onMovieClick={(movie) => navigate(\`/movie/\${movie.imdbID}\`)}
 *   onRemoveFromFavorites={(movie) => removeFromFavorites(movie)}
 *   autoplay={true}
 *   autoplayInterval={3000}
 * />
 * ```
 */

import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import type { Movie } from '@/services/types/movie';

/**
 * Свойства для компонента FavoritesCarousel
 * @interface FavoritesCarouselProps
 * @description
 * Определяет интерфейс для свойств компонента карусели избранных фильмов.
 *
 * @property {Movie[]} favorites - Массив избранных фильмов для отображения
 * @property {(movie: Movie) => void} onMovieClick - Обработчик клика по фильму
 * @property {(movie: Movie) => void} onRemoveFromFavorites - Обработчик удаления из избранного
 * @property {boolean} [autoplay=true] - Включить автопрокрутку
 * @property {number} [autoplayInterval=3000] - Интервал автопрокрутки в мс
 * @property {string} [className=''] - Дополнительные CSS классы
 *
 * @example
 * ```tsx
 * const props: FavoritesCarouselProps = {
 *   favorites: favoriteMovies,
 *   onMovieClick: (movie) => navigate(`/movie/${movie.imdbID}`),
 *   onRemoveFromFavorites: (movie) => dispatch(removeFromFavorites(movie)),
 *   autoplay: true,
 *   autoplayInterval: 3000,
 *   className: 'favorites-carousel'
 * };
 * ```
 */
interface FavoritesCarouselProps {
  favorites: Movie[];
  onMovieClick: (movie: Movie) => void;
  onRemoveFromFavorites: (movie: Movie) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

/**
 * Шаблон карточки фильма для карусели
 * @function movieTemplate
 * @description
 * Создает JSX элемент карточки фильма для отображения в карусели.
 * Включает постер, название, год и кнопку удаления из избранного.
 *
 * @param {Movie} movie - Объект фильма для отображения
 * @param {FavoritesCarouselProps} props - Свойства компонента
 * @returns {JSX.Element} Карточка фильма для карусели
 *
 * @example
 * const card = movieTemplate(movie, props);
 */
const movieTemplate = (movie: Movie, props: FavoritesCarouselProps): React.JSX.Element => {
  const { onMovieClick, onRemoveFromFavorites } = props;

  return (
    <Card
      className="movie-carousel-card"
      onClick={() => onMovieClick(movie)}
      style={{ cursor: 'pointer' }}
    >
      <div className="movie-carousel-content">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <div className="movie-carousel-poster">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="movie-carousel-image"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="movie-carousel-no-poster">
            <span>Постер недоступен</span>
          </div>
        )}

        <div className="movie-carousel-info">
          <h4 className="movie-carousel-title">{movie.Title}</h4>
          <div className="movie-carousel-details">
            <span className="movie-carousel-year">{movie.Year}</span>
            <span className="movie-carousel-type">{movie.Type}</span>
          </div>
        </div>

        <div className="movie-carousel-actions">
          <Button
            icon="pi pi-heart-fill"
            className="p-button-rounded p-button-danger p-button-sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromFavorites(movie);
            }}
            tooltip="Удалить из избранного"
            tooltipOptions={{ position: 'top' }}
          />
        </div>
      </div>
    </Card>
  );
};

/**
 * Компонент карусели избранных фильмов
 * @component
 * @description
 * Рендерит карусель с избранными фильмами с использованием PrimeReact Carousel.
 * Поддерживает автопрокрутку, навигацию и адаптивное отображение.
 *
 * Функциональность:
 * - Адаптивное количество карточек в зависимости от экрана
 * - Автопрокрутка с настраиваемым интервалом
 * - Навигация с точками и стрелками
 * - Обработка пустого состояния
 * - Интеграция с MovieCard для консистентности
 *
 * @param {FavoritesCarouselProps} props - Свойства компонента
 * @param {Movie[]} props.favorites - Массив избранных фильмов
 * @param {(movie: Movie) => void} props.onMovieClick - Обработчик клика по фильму
 * @param {(movie: Movie) => void} props.onRemoveFromFavorites - Обработчик удаления
 * @param {boolean} [props.autoplay=true] - Включить автопрокрутку
 * @param {number} [props.autoplayInterval=3000] - Интервал автопрокрутки
 * @param {string} [props.className=''] - Дополнительные CSS классы
 *
 * @returns {React.JSX.Element} Карусель с избранными фильмами или сообщение о пустом списке
 *
 * @example
 * ```tsx
 * const handleMovieClick = (movie: Movie) => {
 *   navigate(`/movie/${movie.imdbID}`);
 * };
 *
 * const handleRemoveFromFavorites = (movie: Movie) => {
 *   dispatch(removeFromFavorites(movie.imdbID));
 * };
 *
 * <FavoritesCarousel
 *   favorites={favorites}
 *   onMovieClick={handleMovieClick}
 *   onRemoveFromFavorites={handleRemoveFromFavorites}
 *   autoplay={true}
 *   autoplayInterval={3000}
 * />
 * ```
 */
const FavoritesCarousel: React.FC<FavoritesCarouselProps> = ({
  favorites,
  onMovieClick,
  onRemoveFromFavorites,
  autoplay = true,
  autoplayInterval = 3000,
  className = ''
}) => {
  /**
   * Настройки карусели
   * @description
   * Конфигурация PrimeReact Carousel с адаптивными настройками.
   */
  const carouselSettings = {
    value: favorites,
    numVisible: 4,
    numScroll: 1,
    autoplay,
    autoplayInterval,
    circular: true,
    showDots: true,
    showNavigators: true,
    itemTemplate: (movie: Movie) => movieTemplate(movie, {
      favorites,
      onMovieClick,
      onRemoveFromFavorites,
      autoplay,
      autoplayInterval,
      className
    }),
    responsiveOptions: [
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
    ]
  };

  // Если нет избранных фильмов, показываем сообщение
  if (favorites.length === 0) {
    return (
      <div className={`favorites-carousel-empty ${className}`}>
        <Card className="empty-favorites-card">
          <div className="empty-favorites-content">
            <i className="pi pi-heart empty-favorites-icon"></i>
            <h3>Избранное пусто</h3>
            <p>Добавьте фильмы в избранное, чтобы увидеть их здесь</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`favorites-carousel ${className}`}>
      <h2 className="favorites-carousel-title">
        <i className="pi pi-heart"></i>
        Мои избранные фильмы
      </h2>
      <Carousel {...carouselSettings} />
    </div>
  );
};

export default FavoritesCarousel;
