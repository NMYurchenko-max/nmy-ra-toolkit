/**
 * Главная страница приложения с поиском фильмов
 * @fileoverview src/components/pages/Home.tsx
 * @module components/pages/Home
 * @description
 * Основная страница приложения для поиска фильмов через OMDb API:
 * - Большая hero-секция с поисковой строкой
 * - Автоматический поиск с debounce задержкой
 * - Отображение недавних поисковых запросов
 * - Результаты поиска в виде карточек фильмов
 * - Обработка ошибок и пустых результатов
 * - Валидация поисковых запросов
 *
 * Особенности:
 * - Debounce поиск для оптимизации запросов к API
 * - Предупреждения для слишком общих запросов
 * - Адаптивная сетка карточек фильмов
 * - История недавних поисков
 * - Навигация к деталям фильма
 * - Обработка состояний загрузки и ошибок
 *
 * @example
 * ```tsx
 * <Home />
 * // Рендерит главную страницу с поиском фильмов
 * ```
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Chip } from 'primereact/chip';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store/store';
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_DELAY } from '@/utils/constants';

/**
 * Главная страница приложения
 * @component
 * @description
 * Основной компонент для поиска и отображения фильмов.
 * Использует хук useMovieSearch для получения данных и функций поиска.
 *
 * Функциональность:
 * - Поиск фильмов с debounce задержкой
 * - Отображение недавних поисков
 * - Результаты поиска в виде карточек
 * - Обработка ошибок и пустых состояний
 * - Навигация к деталям фильма
 * - Валидация поисковых запросов
 *
 * @returns {JSX.Element} Главная страница с поиском фильмов
 *
 * @example
 * ```tsx
 * const App = () => (
 *   <Layout>
 *     <Home />
 *   </Layout>
 * );
 * ```
 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showCommonWordWarning, setShowCommonWordWarning] = useState(false);

  const {
    movies,
    loading,
    error,
    query,
    totalResults,
    searchMovies,
    clearSearch,
  } = useMovieSearch();

  const { recentSearches } = useSelector((state: RootState) => state.search);

  // Debounce для поискового запроса
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Автоматический поиск при изменении debouncedSearch
  useEffect(() => {
    if (debouncedSearch.length >= MIN_SEARCH_LENGTH) {
      searchMovies(debouncedSearch);
    } else if (debouncedSearch.length === 0) {
      clearSearch();
    }
  }, [debouncedSearch, searchMovies, clearSearch]);

  /**
   * Обрабатывает поисковый запрос пользователя
   * @function handleSearch
   * @description
   * Валидирует и выполняет поиск фильмов по запросу.
   * Проверяет длину запроса и исключает слишком общие слова.
   *
   * @param {string} searchQuery - Поисковый запрос пользователя
   *
   * @example
   * handleSearch('Inception'); // Выполнит поиск фильма Inception
   */
  const handleSearch = useCallback((searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length >= MIN_SEARCH_LENGTH) {
      // Проверяем на слишком общие запросы
      const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'movie', 'film', 'cinema'];
      const isTooCommon = commonWords.includes(trimmedQuery.toLowerCase()) || trimmedQuery.length < 3;

      if (isTooCommon) {
        setShowCommonWordWarning(true);
        return;
      }

      setShowCommonWordWarning(false);

      searchMovies(trimmedQuery);
    }
  }, [searchMovies]);

  /**
   * Обрабатывает клик по карточке фильма
   * @function handleMovieClick
   * @description
   * Переходит к странице детального просмотра фильма.
   *
   * @param {string} movieId - ID фильма для навигации
   *
   * @example
   * handleMovieClick('tt0111161'); // Перейдёт к /movie/tt0111161
   */
  const handleMovieClick = useCallback((movieId: string) => {
    navigate(`/movie/${movieId}`);
  }, [navigate]);

  /**
   * Обрабатывает клик по недавнему поисковому запросу
   * @function handleRecentSearchClick
   * @description
   * Устанавливает выбранный запрос в поле поиска и выполняет поиск.
   *
   * @param {string} searchQuery - Поисковый запрос из истории
   *
   * @example
   * handleRecentSearchClick('The Matrix'); // Установит и выполнит поиск
   */
  const handleRecentSearchClick = useCallback((searchQuery: string) => {
    setSearchInput(searchQuery);
    handleSearch(searchQuery);
  }, [handleSearch]);

  return (
    <div className="space-y-8">
      {/**
       * Hero секция с поисковой формой
       * @description
       * Большая приветственная секция с заголовком, описанием и поисковой строкой.
       * Создаёт первое впечатление от приложения.
       */}
      <div className="hero-section-large">
        <div className="hero-content">
          {/**
           * Главный заголовок hero-секции
           * @description
           * Приветственный заголовок, описывающий основную функцию приложения.
           */}
          <h1>Поиск фильмов</h1>

          {/**
           * Описание возможностей приложения
           * @description
           * Пояснительный текст о базе данных и возможностях поиска.
           */}
          <p>Найдите информацию о любом фильме из базы OMDb. Откройте мир кино одним кликом!</p>

          {/* Строка поиска внутри hero-секции */}
          <div className="search-bar-hero">
            <InputText
              id="search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowCommonWordWarning(false); // Скрываем предупреждение при изменении ввода
              }}
              placeholder="Например: The Matrix, Inception, Breaking Bad..."
              className="search-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchInput)}
            />
            <Button
              label="Поиск"
              icon="pi pi-search"
              onClick={() => handleSearch(searchInput)}
              disabled={searchInput.length < MIN_SEARCH_LENGTH || loading}
              loading={loading}
              className="search-btn"
            />
            {query && (
              <Button
                label="Очистить"
                icon="pi pi-times"
                onClick={() => {
                  setSearchInput('');
                  clearSearch();
                }}
                severity="secondary"
                className="search-btn"
              />
            )}
          </div>

          {/* Сообщения об ошибках */}
          {searchInput.length > 0 && searchInput.length < MIN_SEARCH_LENGTH && (
            <Message
              severity="warn"
              text={`Минимальная длина запроса: ${MIN_SEARCH_LENGTH} символа`}
              className="border-l-4 border-yellow-400 bg-yellow-50"
            />
          )}

          {showCommonWordWarning && (
            <Message
              severity="warn"
              text="Слишком общий запрос. Попробуйте ввести более конкретное название фильма (например, 'Inception 2010' или 'The Matrix')."
              className="border-l-4 border-orange-400 bg-orange-50"
            />
          )}
        </div>
      </div>

      {/* Недавние поиски */}
      {recentSearches.length > 0 && !query && (
        <Card className="recent-searches">
          <h3>Недавние поиски</h3>
          <p>Вы недавно искали эти фильмы</p>
          <div className="recent-searches-list">
            {recentSearches.map((search, index) => (
              <Chip
                key={index}
                label={search}
                onClick={() => handleRecentSearchClick(search)}
                className="recent-search-chip"
              />
            ))}
          </div>
        </Card>
      )}

      {/* Результаты поиска */}
      {loading && (
        <div className="loading-section">
          <h3>Ищем фильмы...</h3>
          <p>Это может занять несколько секунд</p>
        </div>
      )}

      {error && (
        <Message
          severity="error"
          text={error}
          className="error-message"
        />
      )}

      {movies.length > 0 && (
        <Card className="results-section">
          <h3>Результаты поиска</h3>
          <div className="results-info">
            <span>{totalResults} фильмов найдено</span>
            {query && (
              <span>&ldquo;{query}&rdquo;</span>
            )}
          </div>

          <div className="movies-grid">
            {movies.map((movie) => (
              <Card
                key={movie.imdbID}
                className="movie-card"
                onClick={() => handleMovieClick(movie.imdbID)}
              >
                <div className="movie-content">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <div className="movie-poster">
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="movie-image"
                      />
                    </div>
                  ) : (
                    <div className="no-poster">
                      <span>Постер недоступен</span>
                    </div>
                  )}

                  <div className="movie-info">
                    <h4>{movie.Title}</h4>
                    <div className="movie-details">
                      <span>{movie.Year}</span>
                      <span>{movie.Type}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {query && !loading && movies.length === 0 && !error && (
        <Card className="not-found-section">
          <h3>Ничего не найдено</h3>
          <p>По вашему запросу &ldquo;{query}&rdquo; ничего не найдено. Попробуйте изменить поисковый запрос или проверьте правильность написания.</p>
          <Button
            label="Новый поиск"
            icon="pi pi-search"
            onClick={() => {
              setSearchInput('');
              clearSearch();
            }}
            className="search-btn"
          />
        </Card>
      )}

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <p>N.Yurchenko © 2025 MovieSearch App. Использует OMDb API.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
