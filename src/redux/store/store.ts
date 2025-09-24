/**
 * Конфигурация Redux store для приложения поиска фильмов
 * @fileoverview src/redux/store/store.ts
 * @module redux/store
 * @description
 * Настраивает центральное хранилище Redux с поддержкой:
 * - Нескольких слайсов состояния (movies, favorites, search)
 * - Персистентности избранных фильмов в localStorage
 * - TypeScript типизации для type-safe операций
 * - Middleware для обработки асинхронных операций
 *
 * Архитектура состояния:
 * - movies: Управление фильмами, поиском и деталями
 * - favorites: Избранные фильмы (сохраняются в localStorage)
 * - search: История поиска и настройки
 *
 * @example
 * // Использование в компонентах:
 * // import { useSelector, useDispatch } from 'react-redux';
 * // import type { RootState, AppDispatch } from '@/redux/store/store';
 */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import moviesReducer from '@/redux/slices/moviesSlice';
import favoritesReducer from '@/redux/slices/favoritesSlice';
import searchReducer from '@/redux/slices/searchSlice';

/**
 * Конфигурация персистентности для избранных фильмов
 * @description
 * Настраивает сохранение слайса favorites в localStorage.
 * Только избранные фильмы сохраняются между сессиями.
 */
const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

/**
 * Обёрнутый редьюсер для избранных с персистентностью
 * @description
 * Применяет конфигурацию персистентности к редьюсеру favorites.
 */
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

/**
 * Конфигурация Redux store
 * @description
 * Создаёт и настраивает центральное хранилище состояния приложения.
 *
 * Включает:
 * - Все редьюсеры слайсов
 * - Middleware для асинхронных операций (thunks)
 * - Игнорирование определённых действий для redux-persist
 * - TypeScript типизацию
 *
 * @returns {Store} Настроенный Redux store
 */
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: persistedFavoritesReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Persistor для управления состоянием персистентности
 * @description
 * Создаёт persistor для управления сохранением/восстановлением состояния.
 * Используется в PersistGate для блокировки рендера до восстановления.
 */
export const persistor = persistStore(store);

/**
 * Тип состояния всего приложения
 * @description
 * TypeScript тип, представляющий полное состояние Redux store.
 * Автоматически выводится из конфигурации store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип dispatch функции для Redux store
 * @description
 * TypeScript тип для типизированных dispatch операций.
 * Используется с useDispatch для type-safe действий.
 */
export type AppDispatch = typeof store.dispatch;
