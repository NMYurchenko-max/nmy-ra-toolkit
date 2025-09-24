import React from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '@/redux/slices/favoritesSlice';
import type { Movie } from '@/services/types/movie';

/**
 * Свойства для компонента MovieCard
 * @interface MovieCardProps
 * @description
 * Определяет интерфейс для свойств компонента карточки фильма.
 *
 * @property {Movie} movie - Объект фильма для отображения
 * @property {boolean} [isFavorite=false] - Флаг, указывающий, отмечен ли фильм как избранный
 * @property {(movie: Movie) => void} [onFavoriteToggle] - Необязательная функция обратного вызова для обработки переключения избранного
 * @property {boolean} [showFavoriteButton=true] - Флаг для управления видимостью кнопки избранного
 *
 * @example
 * ```tsx
 * <MovieCard
 *   movie={movieData}
 *   isFavorite={true}
 *   onFavoriteToggle={(movie) => console.log('Toggle favorite:', movie.Title)}
 *   showFavoriteButton={true}
 * />
 * ```
 */
interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onFavoriteToggle?: (movie: Movie) => void;
  showFavoriteButton?: boolean;
}

/**
 * Компонент карточки фильма
 * @component
 * @description
 * Отображает информацию о фильме в виде карточки с постером, названием, годом и типом.
 * Предоставляет кнопку для добавления/удаления фильма из избранного.
 *
 * Особенности:
 * - Адаптивное отображение постера с заглушкой для отсутствующих изображений
 * - Интерактивная кнопка избранного с состоянием
 * - Поддержка пользовательских обработчиков событий
 * - Lazy loading для изображений
 *
 * @param {MovieCardProps} props - Свойства компонента
 * @param {Movie} props.movie - Объект фильма с деталями
 * @param {boolean} [props.isFavorite=false] - Статус избранного фильма
 * @param {(movie: Movie) => void} [props.onFavoriteToggle] - Пользовательский обработчик переключения
 * @param {boolean} [props.showFavoriteButton=true] - Показывать ли кнопку избранного
 *
 * @returns {JSX.Element} Карточка фильма с интерактивными элементами
 *
 * @example
 * ```tsx
 * const movie = {
 *   imdbID: 'tt0111161',
 *   Title: 'The Shawshank Redemption',
 *   Year: '1994',
 *   Poster: 'https://example.com/poster.jpg',
 *   Type: 'movie'
 * };
 *
 * <MovieCard
 *   movie={movie}
 *   isFavorite={false}
 *   onFavoriteToggle={(movie) => handleFavoriteToggle(movie)}
 * />
 * ```
 */
const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  onFavoriteToggle,
  showFavoriteButton = true
}) => {
  const dispatch = useDispatch();

  /**
   * Обрабатывает переключение статуса избранного
   * @function handleToggleFavorite
   * @description
   * Выполняет переключение фильма в/из избранного.
   * Использует пользовательский обработчик или Redux actions.
   *
   * @example
   * handleToggleFavorite(); // Переключает статус избранного
   */
  const handleToggleFavorite = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(movie);
    } else {
      // Используем Redux actions, если не предоставлен пользовательский обработчик
      if (isFavorite) {
        dispatch(removeFromFavorites(movie.imdbID));
      } else {
        dispatch(addToFavorites(movie));
      }
    }
  };

  return (
    <div className="movie-card">
      {/**
       * Постер фильма с lazy loading
       * @description
       * Отображает постер фильма или заглушку, если постер недоступен.
       * Использует lazy loading для оптимизации производительности.
       */}
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
        alt={movie.Title}
        loading="lazy"
      />

      {/**
       * Информационная секция карточки
       * @description
       * Содержит название фильма, год выпуска и тип контента.
       */}
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p>{movie.Type}</p>

        {/**
         * Кнопка добавления/удаления из избранного
         * @description
         * Интерактивная кнопка для управления статусом избранного.
         * Показывается только если showFavoriteButton=true.
         */}
        {showFavoriteButton && (
          <button
            onClick={handleToggleFavorite}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
