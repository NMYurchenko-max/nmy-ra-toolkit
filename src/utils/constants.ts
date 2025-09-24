/**
 * Константы приложения для поиска фильмов
 * @module utils/constants
 *
 * Содержит все константы, используемые в приложении:
 * - API ключи и URL для OMDb API
 * - Настройки пагинации и поиска
 * - Ключи для localStorage
 * - Типы контента и статусы загрузки
 * - Сообщения об ошибках и успехе
 * - Регулярные выражения для валидации
 * - Настройки карусели для отображения фильмов
 */

// API ключи для OMDb (используем ваш личный ключ)
export const OMDB_API_KEYS = ['20005ff3'];

// Базовый URL для OMDb API
export const OMDB_BASE_URL = 'https://www.omdbapi.com';

// URL для постеров
export const OMDB_POSTER_URL = 'https://img.omdbapi.com';

// Максимальное количество фильмов на странице
export const MOVIES_PER_PAGE = 10;

// Максимальное количество недавних поисков
export const MAX_RECENT_SEARCHES = 10;

// Минимальная длина поискового запроса
export const MIN_SEARCH_LENGTH = 3;

// Задержка для debounce поиска (мс)
export const SEARCH_DEBOUNCE_DELAY = 500;

// Локальные ключи для localStorage
export const STORAGE_KEYS = {
  FAVORITES: 'movieFavorites',
  RECENT_SEARCHES: 'recentSearches',
  THEME: 'appTheme',
} as const;

// Типы контента для поиска
export const CONTENT_TYPES = {
  MOVIE: 'movie',
  SERIES: 'series',
  EPISODE: 'episode',
} as const;

// Статусы загрузки
export const LOADING_STATES = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  SEARCH_FAILED: 'Ошибка при поиске фильмов',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
  API_LIMIT_EXCEEDED: 'Превышен лимит запросов к API',
  INVALID_API_KEY: 'Неверный API ключ',
  MOVIE_ALREADY_FAVORITE: 'Фильм уже добавлен в избранное',
  FAVORITES_LOAD_ERROR: 'Ошибка при загрузке избранного',
} as const;

// Сообщения для пользователя
export const SUCCESS_MESSAGES = {
  MOVIE_ADDED_TO_FAVORITES: 'Фильм добавлен в избранное',
  MOVIE_REMOVED_FROM_FAVORITES: 'Фильм удален из избранного',
  FAVORITES_CLEARED: 'Избранное очищено',
} as const;

// Регулярные выражения
export const REGEX_PATTERNS = {
  IMDB_ID: /^tt\d{7,8}$/,
  YEAR: /^\d{4}$/,
} as const;

// Настройки карусели
export const CAROUSEL_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
} as const;
