/**
 * Redux slice для управления избранными фильмами
 * @fileoverview src/redux/slices/favoritesSlice.ts
 * @module redux/slices/favoritesSlice
 * @description
 * Управляет состоянием избранных фильмов пользователя:
 * - Добавление фильмов в избранное
 * - Удаление фильмов из избранного
 * - Переключение статуса избранного
 * - Очистка всех избранных
 * - Управление состоянием загрузки и ошибок
 *
 * Особенности:
 * - Предотвращает дублирование фильмов в избранном
 * - Поддерживает toggle функциональность
 * - Сохраняется в localStorage через redux-persist
 * - TypeScript типизация для безопасности
 *
 * @example
 * // Использование в компонентах:
 * // dispatch(addToFavorites(movie));
 * // dispatch(toggleFavorite(movie));
 * // dispatch(removeFromFavorites(movieId));
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '@/services/types/movie';

/**
 * Интерфейс состояния избранных фильмов
 * @interface FavoritesState
 * @description
 * Определяет структуру состояния для избранных фильмов:
 * - items: Массив избранных фильмов
 * - loading: Статус загрузки операций
 * - error: Сообщение об ошибке при операциях
 */
interface FavoritesState {
  /** Массив избранных фильмов пользователя */
  items: Movie[];
  /** Статус загрузки операций с избранным */
  loading: boolean;
  /** Сообщение об ошибке или null */
  error: string | null;
}

/**
 * Начальное состояние избранных фильмов
 * @description
 * Определяет состояние по умолчанию при инициализации приложения.
 */
const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Redux slice для избранных фильмов
 * @description
 * Создаёт slice с редьюсерами для управления избранными фильмами.
 * Использует immer для иммутабельных обновлений состояния.
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Добавляет фильм в избранное
     * @param state - Текущее состояние
     * @param action - Action с фильмом для добавления
     * @description
     * Добавляет фильм в список избранных, если его там ещё нет.
     * Предотвращает дублирование фильмов по imdbID.
     */
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      if (!state.items.find(item => item.imdbID === action.payload.imdbID)) {
        state.items.push(action.payload);
      }
    },

    /**
     * Удаляет фильм из избранного по ID
     * @param state - Текущее состояние
     * @param action - Action с ID фильма для удаления
     * @description
     * Удаляет фильм из избранного по его imdbID.
     */
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.imdbID !== action.payload);
    },

    /**
     * Переключает статус избранного для фильма
     * @param state - Текущее состояние
     * @param action - Action с фильмом для переключения
     * @description
     * Если фильм уже в избранном - удаляет его.
     * Если фильма нет в избранном - добавляет его.
     * Удобная функция для кнопок "Добавить в избранное".
     */
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.items.findIndex(item => item.imdbID === movie.imdbID);

      if (existingIndex >= 0) {
        // Удаляем из избранного
        state.items.splice(existingIndex, 1);
      } else {
        // Добавляем в избранное
        state.items.push(movie);
      }
    },

    /**
     * Очищает все избранные фильмы
     * @param state - Текущее состояние
     * @description
     * Полностью очищает список избранных фильмов.
     */
    clearFavorites: (state) => {
      state.items = [];
    },

    /**
     * Очищает ошибку избранного
     * @param state - Текущее состояние
     * @description
     * Сбрасывает сообщение об ошибке в null.
     */
    clearFavoritesError: (state) => {
      state.error = null;
    },

    /**
     * Устанавливает статус загрузки
     * @param state - Текущее состояние
     * @param action - Action с булевым значением загрузки
     * @description
     * Обновляет статус загрузки для операций с избранным.
     */
    setFavoritesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Устанавливает ошибку избранного
     * @param state - Текущее состояние
     * @param action - Action с сообщением об ошибке
     * @description
     * Устанавливает сообщение об ошибке для операций с избранным.
     */
    setFavoritesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

/**
 * Экспорт actions для использования в компонентах
 * @description
 * Все actions, созданные в slice, для dispatch в компонентах.
 */
export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
  clearFavoritesError,
  setFavoritesLoading,
  setFavoritesError
} = favoritesSlice.actions;

/**
 * Экспорт редьюсера по умолчанию
 * @description
 * Основной редьюсер slice для использования в store.
 */
export default favoritesSlice.reducer;
