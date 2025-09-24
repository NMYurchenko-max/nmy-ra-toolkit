/**
 * Сервис для работы с OMDb API
 * @module services/api/omdbApi
 */

import axios from 'axios';
import type { MovieDetails, SearchResponse } from '@/services/types/movie';
import { MOCK_MOVIE_DATA, MOCK_SEARCH_RESULTS, getMockMovieById, mockSearchMovies } from '../../utils/mockData';

// API ключи (используем ваш личный ключ)
const API_KEYS = ['20005ff3'];
const BASE_URL = 'https://www.omdbapi.com';

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    // По умолчанию используем первый ключ, но можно добавить логику ротации
    apikey: API_KEYS[0]
  }
});

// Флаг для использования моковых данных (для тестирования)
// Отключаем моковые данные для использования реального API
const USE_MOCK_DATA = false;

/**
 * Поиск фильмов по названию
 * @param query - поисковый запрос
 * @param page - номер страницы (по умолчанию 1)
 * @returns Promise с результатами поиска
 */
export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  // Если включен режим моковых данных, используем их
  if (USE_MOCK_DATA) {
    return mockSearchMovies(query);
  }

  try {
    const response = await api.get('/', {
      params: {
        s: query.trim(),
        page,
        type: 'movie' // Ищем только фильмы
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Ошибка при поиске фильмов');
  }
};

/**
 * Получение детальной информации о фильме по ID
 * @param imdbID - ID фильма в IMDb
 * @returns Promise с детальной информацией о фильме
 */
export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  // Если включен режим моковых данных, используем их
  if (USE_MOCK_DATA) {
    const mockMovie = getMockMovieById(imdbID);
    if (mockMovie) {
      return mockMovie;
    }
    // Если фильм не найден в моковых данных, возвращаем тестовый фильм
    return MOCK_MOVIE_DATA;
  }

  try {
    const response = await api.get('/', {
      params: {
        i: imdbID,
        plot: 'full' // Полный сюжет
      }
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Фильм не найден');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Ошибка при получении информации о фильме');
  }
};

/**
 * Поиск фильмов по ID (альтернативный метод)
 * @param imdbID - ID фильма в IMDb
 * @returns Promise с результатами поиска
 */
export const searchMovieById = async (imdbID: string): Promise<SearchResponse> => {
  // Если включен режим моковых данных, используем их
  if (USE_MOCK_DATA) {
    const mockMovie = getMockMovieById(imdbID);
    if (mockMovie) {
      return {
        Search: [mockMovie],
        totalResults: "1",
        Response: "True"
      };
    }
    return MOCK_SEARCH_RESULTS;
  }

  try {
    const response = await api.get('/', {
      params: {
        i: imdbID
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error searching movie by ID:', error);
    throw new Error('Ошибка при поиске фильма по ID');
  }
};

/**
 * Функция для переключения между реальными и моковыми данными
 * @param useMock - использовать ли моковые данные
 */
export const setMockMode = (useMock: boolean) => {
  (globalThis as typeof globalThis & { USE_MOCK_DATA?: boolean }).USE_MOCK_DATA = useMock;
};
