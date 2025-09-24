/**
 * Кастомный хук для поиска и управления фильмами
 * @fileoverview src/hooks/useMovieSearch.ts
 * @module hooks/useMovieSearch
 * @description
 * Предоставляет функциональность для поиска фильмов через OMDb API:
 * - Поиск фильмов по запросу с пагинацией
 * - Загрузка дополнительных результатов
 * - Очистка результатов поиска
 * - Управление состоянием загрузки и ошибок
 * - Автоматическое добавление запросов в историю
 *
 * Использует Redux для управления состоянием и предоставляет
 * типизированный интерфейс для компонентов React.
 *
 * @example
 * ```tsx
 * const {
 *   movies,
 *   loading,
 *   error,
 *   searchMovies,
 *   loadMoreMovies,
 *   clearSearch
 * } = useMovieSearch();
 *
 * // Поиск фильмов
 * await searchMovies('Batman');
 *
 * // Загрузка следующих результатов
 * await loadMoreMovies();
 *
 * // Очистка поиска
 * clearSearch();
 * ```
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store/store';
import type { Movie } from '@/services/types/movie';
import { searchMoviesAsync, clearMovies, setCurrentPage, getMovieDetailsAsync } from '@/redux/slices/moviesSlice';
import { setSearchQuery, addRecentSearch } from '@/redux/slices/searchSlice';

/**
 * Интерфейс возвращаемых значений хука
 * @interface UseMovieSearchReturn
 * @description
 * Определяет все значения и функции, возвращаемые хуком useMovieSearch.
 */
interface UseMovieSearchReturn {
  /** Массив найденных фильмов */
  movies: Movie[];
  /** Текущий выбранный фильм для детального просмотра */
  currentMovie: Movie | undefined;
  /** Статус загрузки операций */
  loading: boolean;
  /** Сообщение об ошибке или null */
  error: string | null;
  /** Текущий поисковый запрос */
  query: string;
  /** Общее количество найденных фильмов */
  totalResults: number;
  /** Текущая страница пагинации */
  currentPage: number;
  /** Флаг наличия дополнительных страниц */
  hasMorePages: boolean;
  /** Функция для поиска фильмов */
  searchMovies: (searchQuery: string, page?: number) => Promise<{ movies: Movie[]; totalResults: number; query: string; page: number } | undefined>;
  /** Функция для загрузки следующей страницы */
  loadMoreMovies: () => Promise<void>;
  /** Функция для очистки результатов поиска */
  clearSearch: () => void;
}

/**
 * Кастомный хук для поиска фильмов
 * @function useMovieSearch
 * @description
 * Предоставляет полный интерфейс для работы с поиском фильмов.
 * Управляет состоянием через Redux и предоставляет оптимизированные
 * callback функции для предотвращения лишних рендеров.
 *
 * @returns {UseMovieSearchReturn} Объект с состоянием и функциями поиска
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { movies, loading, searchMovies, clearSearch } = useMovieSearch();
 *
 *   const handleSearch = async (query: string) => {
 *     try {
 *       await searchMovies(query);
 *     } catch (error) {
 *       console.error('Search failed:', error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => handleSearch('Inception')}>
 *         Search Inception
 *       </button>
 *       {movies.map(movie => (
 *         <div key={movie.imdbID}>{movie.Title}</div>
 *       ))}
 *     </div>
 *   );
 * };
 * ```
 */
export const useMovieSearch = (): UseMovieSearchReturn => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем состояние фильмов из Redux store
  const {
    movies,
    currentMovie,
    loading,
    error,
    totalResults,
    currentPage
  } = useSelector((state: RootState) => state.movies);

  // Получаем текущий поисковый запрос
  const { query } = useSelector((state: RootState) => state.search);

  /**
   * Выполняет поиск фильмов по запросу
   * @function searchMovies
   * @description
   * Асинхронно выполняет поиск фильмов через OMDb API.
   * Автоматически добавляет запрос в историю недавних поисков.
   *
   * @param {string} searchQuery - Поисковый запрос
   * @param {number} page - Номер страницы (по умолчанию 1)
   * @returns {Promise<any>} Результат поиска с фильмами
   *
   * @throws {Error} При ошибке поиска
   *
   * @example
   * const result = await searchMovies('The Matrix', 1);
   */
  const searchMovies = useCallback(async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;

    // Устанавливаем поисковый запрос в состояние
    dispatch(setSearchQuery(searchQuery));

    // Добавляем запрос в историю недавних поисков
    dispatch(addRecentSearch(searchQuery));

    try {
      // Проверяем, если запрос похож на IMDb ID, используем getMovieDetailsAsync
      const imdbIdPattern = /^tt\d{7,8}$/i;
      if (imdbIdPattern.test(searchQuery.trim())) {
        const result = await dispatch(getMovieDetailsAsync(searchQuery.trim())).unwrap();
        // Возвращаем результат в формате, совместимом с searchMoviesAsync
        return {
          movies: result ? [result] : [],
          totalResults: result ? 1 : 0,
          query: searchQuery,
          page,
        };
      } else {
        const result = await dispatch(searchMoviesAsync({ query: searchQuery, page })).unwrap();
        return result;
      }
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }, [dispatch]);

  /**
   * Загружает следующую страницу результатов поиска
   * @function loadMoreMovies
   * @description
   * Загружает дополнительные результаты поиска для текущего запроса.
   * Увеличивает номер текущей страницы и выполняет поиск.
   *
   * @returns {Promise<void>} Promise без значения
   *
   * @throws {Error} При ошибке загрузки
   *
   * @example
   * await loadMoreMovies(); // Загрузит страницу 2, 3, 4...
   */
  const loadMoreMovies = useCallback(async () => {
    if (!query || loading) return;

    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));

    try {
      await dispatch(searchMoviesAsync({ query, page: nextPage })).unwrap();
    } catch (error) {
      console.error('Load more failed:', error);
      // Возвращаем предыдущую страницу при ошибке
      dispatch(setCurrentPage(currentPage));
      throw error;
    }
  }, [dispatch, query, loading, currentPage]);

  /**
   * Очищает результаты поиска
   * @function clearSearch
   * @description
   * Полностью очищает результаты поиска и сбрасывает поисковый запрос.
   * Возвращает приложение в исходное состояние.
   *
   * @example
   * clearSearch(); // Очистить все результаты
   */
  const clearSearch = useCallback(() => {
    dispatch(clearMovies());
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  /**
   * Проверяет наличие дополнительных страниц
   * @description
   * Вычисляет, есть ли ещё страницы с результатами для загрузки.
   */
  const hasMorePages = movies.length > 0 && movies.length < totalResults;

  return {
    movies,
    currentMovie,
    loading,
    error,
    query,
    totalResults,
    currentPage,
    hasMorePages,
    searchMovies,
    loadMoreMovies,
    clearSearch,
  };
};
