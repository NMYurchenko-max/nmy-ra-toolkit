/**
 * Компонент списка фильмов
 * @fileoverview src/components/entities/MovieList.tsx
 * @module components/entities/MovieList
 * @description
 * Отображает список фильмов в виде адаптивной сетки карточек.
 * Поддерживает состояния загрузки, пустого списка и управление избранным.
 *
 * Особенности:
 * - Адаптивная сетка от 1 до 4 колонок в зависимости от размера экрана
 * - Состояния загрузки и пустого результата с иконками
 * - Интеграция с компонентом MovieCard для отображения каждого фильма
 * - Поддержка пользовательских обработчиков для избранного
 * - Опциональные CSS классы для кастомизации
 *
 * @example
 * ```tsx
 * <MovieList
 *   movies={moviesArray}
 *   favorites={favoriteIds}
 *   onFavoriteToggle={(movie) => handleFavorite(movie)}
 *   loading={false}
 *   className="custom-grid"
 * />
 * ```
 */

import React from 'react';
import MovieCard from '@/components/entities/MovieCard/MovieCard';
import type { Movie } from '@/services/types/movie';

/**
 * Свойства для компонента MovieList
 * @interface MovieListProps
 * @description
 * Определяет интерфейс для свойств компонента списка фильмов.
 *
 * @property {Movie[]} movies - Массив фильмов для отображения
 * @property {(movie: Movie) => void} [onFavoriteToggle] - Обработчик переключения избранного
 * @property {string[]} [favorites=[]] - Массив ID избранных фильмов
 * @property {boolean} [loading=false] - Флаг состояния загрузки
 * @property {string} [className=''] - Дополнительные CSS классы
 *
 * @example
 * ```tsx
 * const props: MovieListProps = {
 *   movies: movieArray,
 *   favorites: ['tt0111161', 'tt0068646'],
 *   onFavoriteToggle: (movie) => console.log('Toggle:', movie.Title),
 *   loading: false,
 *   className: 'my-custom-class'
 * };
 * ```
 */
interface MovieListProps {
  movies: Movie[];
  onFavoriteToggle?: (movie: Movie) => void;
  favorites?: string[];
  loading?: boolean;
  className?: string;
}

/**
 * Компонент для отображения списка фильмов
 * @component
 * @description
 * Рендерит адаптивную сетку карточек фильмов с поддержкой состояний загрузки и пустого списка.
 * Каждый фильм отображается через компонент MovieCard.
 *
 * Сетка адаптируется под размер экрана:
 * - Мобильные: 1 колонка
 * - Планшеты: 2 колонки
 * - Десктоп: 3-4 колонки
 *
 * @param {MovieListProps} props - Свойства компонента
 * @param {Movie[]} props.movies - Массив фильмов для отображения
 * @param {(movie: Movie) => void} [props.onFavoriteToggle] - Обработчик переключения избранного
 * @param {string[]} [props.favorites=[]] - Массив ID избранных фильмов
 * @param {boolean} [props.loading=false] - Показывать ли состояние загрузки
 * @param {string} [props.className=''] - Дополнительные CSS классы для контейнера
 *
 * @returns {JSX.Element} Сетка карточек фильмов или состояние загрузки/пустого списка
 *
 * @example
 * ```tsx
 * const movies = [
 *   { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', ... },
 *   { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', ... }
 * ];
 *
 * const favorites = ['tt0111161'];
 *
 * <MovieList
 *   movies={movies}
 *   favorites={favorites}
 *   onFavoriteToggle={(movie) => handleToggleFavorite(movie)}
 *   loading={false}
 * />
 * ```
 */
const MovieList: React.FC<MovieListProps> = ({
  movies,
  onFavoriteToggle,
  favorites = [],
  loading = false,
  className = ''
}) => {
  /**
   * Состояние загрузки
   * @description
   * Показывает индикатор загрузки с иконкой фильма и сообщением.
   */
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🎬</div>
        <p className="text-gray-600">Загрузка фильмов...</p>
      </div>
    );
  }

  /**
   * Пустое состояние
   * @description
   * Показывает сообщение, когда фильмы не найдены, с иконкой поиска.
   */
  if (movies.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-600">Фильмы не найдены</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
      {/**
       * Сетка карточек фильмов
       * @description
       * Отображает каждую карточку фильма с использованием компонента MovieCard.
       * Передает статус избранного и обработчик переключения.
       */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.includes(movie.imdbID)}
          showFavoriteButton={!!onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default MovieList;
