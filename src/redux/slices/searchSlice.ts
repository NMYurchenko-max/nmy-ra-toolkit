/**
 * Redux slice для управления состоянием поиска фильмов
 * @fileoverview src/redux/slices/searchSlice.ts
 * @module redux/slices/searchSlice
 * @description
 * Управляет состоянием поиска в приложении:
 * - Текущий поисковый запрос
 * - История недавних поисков (сохраняется в localStorage)
 * - Статус загрузки и ошибки поиска
 *
 * Особенности:
 * - Автоматическое сохранение истории поиска в localStorage
 * - Ограничение количества недавних поисков (10 элементов)
 * - Валидация поисковых запросов
 * - Обработка ошибок при работе с localStorage
 *
 * @example
 * // Использование в компонентах:
 * // dispatch(setSearchQuery('Batman'));
 * // dispatch(addRecentSearch('Inception'));
 * // dispatch(clearRecentSearches());
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

/**
 * Интерфейс состояния поиска
 * @interface SearchState
 * @description
 * Определяет структуру состояния для поиска:
 * - query: Текущий поисковый запрос
 * - recentSearches: Массив недавних поисков
 * - loading: Статус загрузки поиска
 * - error: Сообщение об ошибке поиска
 */
interface SearchState {
  /** Текущий поисковый запрос пользователя */
  query: string;
  /** Массив недавних поисковых запросов */
  recentSearches: string[];
  /** Статус загрузки операции поиска */
  loading: boolean;
  /** Сообщение об ошибке или null */
  error: string | null;
}

/**
 * Начальное состояние поиска
 * @description
 * Определяет состояние по умолчанию при инициализации.
 * Загружает недавние поиски из localStorage.
 */
const initialState: SearchState = {
  query: '',
  recentSearches: [],
  loading: false,
  error: null,
};

/**
 * Загружает недавние поиски из localStorage
 * @function loadRecentSearches
 * @description
 * Восстанавливает историю поисков из локального хранилища браузера.
 * Обрабатывает ошибки парсинга JSON для надёжности.
 *
 * @returns {string[]} Массив недавних поисковых запросов
 *
 * @example
 * // При инициализации приложения
 * const recentSearches = loadRecentSearches();
 */
const loadRecentSearches = (): string[] => {
  try {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading recent searches from localStorage:', error);
    return [];
  }
};

/**
 * Сохраняет недавние поиски в localStorage
 * @function saveRecentSearches
 * @description
 * Сохраняет обновлённую историю поисков в локальное хранилище.
 * Обрабатывает ошибки записи для надёжности.
 *
 * @param {string[]} searches - Массив поисковых запросов для сохранения
 *
 * @example
 * // После добавления нового поиска
 * saveRecentSearches(['Batman', 'Inception', 'Matrix']);
 */
const saveRecentSearches = (searches: string[]) => {
  try {
    localStorage.setItem('recentSearches', JSON.stringify(searches));
  } catch (error) {
    console.error('Error saving recent searches to localStorage:', error);
  }
};

/**
 * Redux slice для управления состоянием поиска
 * @description
 * Создаёт slice с редьюсерами для управления состоянием поиска.
 * Инициализирует recentSearches из localStorage.
 */
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    ...initialState,
    recentSearches: loadRecentSearches(),
  },
  reducers: {
    /**
     * Устанавливает текущий поисковый запрос
     * @param state - Текущее состояние
     * @param action - Action с поисковым запросом
     * @description
     * Обновляет текущий поисковый запрос и очищает ошибки.
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.error = null;
    },

    /**
     * Добавляет поисковый запрос в историю
     * @param state - Текущее состояние
     * @param action - Action с поисковым запросом
     * @description
     * Добавляет новый поиск в начало истории недавних поисков.
     * Удаляет дубликаты, ограничивает количество до 10 элементов.
     * Сохраняет в localStorage.
     */
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim().toLowerCase();

      if (query && query.length > 2) {
        // Удаляем существующий поиск, если он есть
        state.recentSearches = state.recentSearches.filter(search => search !== query);

        // Добавляем в начало списка
        state.recentSearches.unshift(query);

        // Ограничиваем количество недавних поисков
        if (state.recentSearches.length > 10) {
          state.recentSearches = state.recentSearches.slice(0, 10);
        }

        saveRecentSearches(state.recentSearches);
      }
    },

    /**
     * Удаляет поисковый запрос из истории
     * @param state - Текущее состояние
     * @param action - Action с поисковым запросом для удаления
     * @description
     * Удаляет указанный поиск из истории недавних поисков.
     * Сохраняет изменения в localStorage.
     */
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(search => search !== action.payload);
      saveRecentSearches(state.recentSearches);
    },

    /**
     * Очищает всю историю недавних поисков
     * @param state - Текущее состояние
     * @description
     * Полностью очищает историю недавних поисков.
     * Сохраняет пустой массив в localStorage.
     */
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      saveRecentSearches([]);
    },

    /**
     * Устанавливает статус загрузки поиска
     * @param state - Текущее состояние
     * @param action - Action с булевым значением загрузки
     * @description
     * Обновляет статус загрузки для операций поиска.
     */
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Устанавливает ошибку поиска
     * @param state - Текущее состояние
     * @param action - Action с сообщением об ошибке
     * @description
     * Устанавливает сообщение об ошибке и сбрасывает статус загрузки.
     */
    setSearchError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    /**
     * Очищает ошибку поиска
     * @param state - Текущее состояние
     * @description
     * Сбрасывает сообщение об ошибке поиска в null.
     */
    clearSearchError: (state) => {
      state.error = null;
    },
  },
});

/**
 * Экспорт actions для использования в компонентах
 * @description
 * Все actions, созданные в slice, для dispatch в компонентах.
 */
export const {
  setSearchQuery,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  setSearchLoading,
  setSearchError,
  clearSearchError,
} = searchSlice.actions;

/**
 * Экспорт редьюсера по умолчанию
 * @description
 * Основной редьюсер slice для использования в store.
 */
export default searchSlice.reducer;
