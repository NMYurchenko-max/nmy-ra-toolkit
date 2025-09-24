/**
 * Кастомный хук для управления избранными фильмами
 * @fileoverview src/hooks/useFavorites.ts
 * @module hooks/useFavorites
 * @description
 * Предоставляет функциональность для работы с избранными фильмами:
 * - Добавление фильмов в избранное
 * - Удаление фильмов из избранного
 * - Переключение статуса избранного
 * - Очистка всех избранных
 * - Проверка наличия фильма в избранном
 * - Поиск фильма в избранном по ID
 * - Управление состоянием загрузки и ошибок
 *
 * Использует Redux для управления состоянием и предоставляет
 * типизированный интерфейс для компонентов React.
 * Состояние избранных сохраняется в localStorage через redux-persist.
 *
 * @example
 * ```tsx
 * const {
 *   favorites,
 *   addFavorite,
 *   removeFavorite,
 *   toggleMovieFavorite,
 *   isFavorite
 * } = useFavorites();
 *
 * // Добавление в избранное
 * addFavorite(movie);
 *
 * // Удаление из избранного
 * removeFavorite(movieId);
 *
 * // Переключение статуса
 * toggleMovieFavorite(movie);
 *
 * // Проверка в избранном
 * const favorite = isFavorite(movieId);
 * ```
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store/store';
import type { Movie } from '@/services/types/movie';
import {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
  clearFavoritesError
} from '@/redux/slices/favoritesSlice';

/**
 * Интерфейс возвращаемых значений хука
 * @interface UseFavoritesReturn
 * @description
 * Определяет все значения и функции, возвращаемые хуком useFavorites.
 */
interface UseFavoritesReturn {
  /** Массив избранных фильмов */
  favorites: Movie[];
  /** Статус загрузки операций */
  loading: boolean;
  /** Сообщение об ошибке или null */
  error: string | null;
  /** Функция для добавления фильма в избранное */
  addFavorite: (movie: Movie) => void;
  /** Функция для удаления фильма из избранного */
  removeFavorite: (imdbID: string) => void;
  /** Функция для переключения статуса избранного */
  toggleMovieFavorite: (movie: Movie) => void;
  /** Функция для очистки всех избранных */
  clearAllFavorites: () => void;
  /** Функция для очистки ошибки */
  clearError: () => void;
  /** Функция для проверки наличия фильма в избранном */
  isFavorite: (imdbID: string) => boolean;
  /** Функция для поиска фильма в избранном по ID */
  getFavoriteById: (imdbID: string) => Movie | undefined;
}

/**
 * Кастомный хук для управления избранными фильмами
 * @function useFavorites
 * @description
 * Предоставляет полный интерфейс для работы с избранными фильмами.
 * Управляет состоянием через Redux и предоставляет оптимизированные
 * callback функции для предотвращения лишних рендеров.
 *
 * Особенности:
 * - Автоматическое предотвращение дублирования
 * - Сохранение в localStorage между сессиями
 * - TypeScript типизация для безопасности
 * - Оптимизированные callback функции
 *
 * @returns {UseFavoritesReturn} Объект с состоянием и функциями избранного
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const {
 *     favorites,
 *     addFavorite,
 *     removeFavorite,
 *     isFavorite,
 *     toggleMovieFavorite
 *   } = useFavorites();
 *
 *   const handleFavoriteClick = (movie: Movie) => {
 *     if (isFavorite(movie.imdbID)) {
 *       removeFavorite(movie.imdbID);
 *     } else {
 *       addFavorite(movie);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => handleFavoriteClick(movie)}>
 *         {isFavorite(movie.imdbID) ? 'Remove from' : 'Add to'} Favorites
 *       </button>
 *       <div>
 *         {favorites.map(movie => (
 *           <div key={movie.imdbID}>{movie.Title}</div>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useFavorites = (): UseFavoritesReturn => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем состояние избранных из Redux store
  const {
    items: favorites,
    loading,
    error
  } = useSelector((state: RootState) => state.favorites);

  /**
   * Добавляет фильм в избранное
   * @function addFavorite
   * @description
   * Добавляет указанный фильм в список избранных.
   * Если фильм уже есть в избранном, дублирование не происходит.
   *
   * @param {Movie} movie - Фильм для добавления в избранное
   *
   * @example
   * addFavorite(movie); // Добавит фильм в избранное
   */
  const addFavorite = useCallback((movie: Movie) => {
    dispatch(addToFavorites(movie));
  }, [dispatch]);

  /**
   * Удаляет фильм из избранного по ID
   * @function removeFavorite
   * @description
   * Удаляет фильм из списка избранных по его IMDb ID.
   *
   * @param {string} imdbID - ID фильма для удаления
   *
   * @example
   * removeFavorite('tt0111161'); // Удалит фильм с указанным ID
   */
  const removeFavorite = useCallback((imdbID: string) => {
    dispatch(removeFromFavorites(imdbID));
  }, [dispatch]);

  /**
   * Переключает статус избранного для фильма
   * @function toggleMovieFavorite
   * @description
   * Если фильм уже в избранном - удаляет его.
   * Если фильма нет в избранном - добавляет его.
   * Удобная функция для кнопок "Добавить в избранное".
   *
   * @param {Movie} movie - Фильм для переключения статуса
   *
   * @example
   * toggleMovieFavorite(movie); // Переключит статус избранного
   */
  const toggleMovieFavorite = useCallback((movie: Movie) => {
    dispatch(toggleFavorite(movie));
  }, [dispatch]);

  /**
   * Очищает все избранные фильмы
   * @function clearAllFavorites
   * @description
   * Полностью очищает список избранных фильмов.
   * Удаляет все фильмы из избранного.
   *
   * @example
   * clearAllFavorites(); // Очистит все избранные фильмы
   */
  const clearAllFavorites = useCallback(() => {
    dispatch(clearFavorites());
  }, [dispatch]);

  /**
   * Очищает ошибку избранного
   * @function clearError
   * @description
   * Сбрасывает сообщение об ошибке в null.
   * Используется для очистки ошибок после их отображения.
   *
   * @example
   * clearError(); // Очистит сообщение об ошибке
   */
  const clearError = useCallback(() => {
    dispatch(clearFavoritesError());
  }, [dispatch]);

  /**
   * Проверяет наличие фильма в избранном
   * @function isFavorite
   * @description
   * Проверяет, есть ли фильм с указанным ID в списке избранных.
   *
   * @param {string} imdbID - ID фильма для проверки
   * @returns {boolean} true если фильм в избранном, false иначе
   *
   * @example
   * const isFav = isFavorite('tt0111161'); // Проверит наличие фильма
   */
  const isFavorite = useCallback((imdbID: string) => {
    return favorites.some(movie => movie.imdbID === imdbID);
  }, [favorites]);

  /**
   * Находит фильм в избранном по ID
   * @function getFavoriteById
   * @description
   * Ищет фильм в списке избранных по его IMDb ID.
   *
   * @param {string} imdbID - ID фильма для поиска
   * @returns {Movie | undefined} Найденный фильм или undefined
   *
   * @example
   * const movie = getFavoriteById('tt0111161'); // Найдёт фильм или вернёт undefined
   */
  const getFavoriteById = useCallback((imdbID: string) => {
    return favorites.find(movie => movie.imdbID === imdbID);
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    toggleMovieFavorite,
    clearAllFavorites,
    clearError,
    isFavorite,
    getFavoriteById,
  };
};
