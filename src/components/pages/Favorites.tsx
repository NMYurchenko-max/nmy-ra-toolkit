/**
 * Страница избранных фильмов пользователя
 * @fileoverview src/components/pages/Favorites.tsx
 * @module components/pages/Favorites
 * @description
 * Отображает коллекцию фильмов, добавленных пользователем в избранное:
 * - Список избранных фильмов в виде карточек
 * - Статистика количества фильмов в избранном
 * - Возможность удаления отдельных фильмов
 * - Возможность очистки всего избранного
 * - Пустое состояние с призывом к действию
 * - Навигация к деталям фильма
 *
 * Особенности:
 * - Адаптивная сетка карточек фильмов
 * - Подтверждение действий удаления
 * - Градиентные дизайны и анимации
 * - Hover эффекты для интерактивности
 * - Сохранение состояния в localStorage
 *
 * @example
 * ```tsx
 * <Favorites />
 * // Рендерит страницу с избранными фильмами
 * ```
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useFavorites } from '@/hooks/useFavorites';

/**
 * Страница с избранными фильмами
 * @component
 * @description
 * Основной компонент для отображения и управления избранными фильмами.
 * Использует хук useFavorites для получения данных и функций управления.
 *
 * Функциональность:
 * - Отображение списка избранных фильмов
 * - Удаление фильмов из избранного с подтверждением
 * - Очистка всего избранного
 * - Навигация к деталям фильма
 * - Пустое состояние для новых пользователей
 *
 * @returns {JSX.Element} Страница с избранными фильмами
 *
 * @example
 * ```tsx
 * const App = () => (
 *   <Layout>
 *     <Favorites />
 *   </Layout>
 * );
 * ```
 */
const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const {
    favorites,
    removeFavorite,
    clearAllFavorites
  } = useFavorites();

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
  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  /**
   * Обрабатывает удаление фильма из избранного
   * @function handleRemoveFavorite
   * @description
   * Показывает диалог подтверждения перед удалением фильма из избранного.
   * Использует PrimeReact ConfirmDialog для пользовательского опыта.
   *
   * @param {string} movieId - ID фильма для удаления
   * @param {string} movieTitle - Название фильма для отображения в диалоге
   *
   * @example
   * handleRemoveFavorite('tt0111161', 'The Shawshank Redemption');
   */
  const handleRemoveFavorite = (movieId: string, movieTitle: string) => {
    confirmDialog({
      message: `Удалить "${movieTitle}" из избранного?`,
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      accept: () => removeFavorite(movieId),
    });
  };

  /**
   * Обрабатывает очистку всего избранного
   * @function handleClearAll
   * @description
   * Показывает диалог подтверждения перед очисткой всех избранных фильмов.
   * Использует PrimeReact ConfirmDialog для безопасности.
   *
   * @example
   * handleClearAll(); // Покажет диалог подтверждения
   */
  const handleClearAll = () => {
    confirmDialog({
      message: 'Удалить все фильмы из избранного?',
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Удалить все',
      rejectLabel: 'Отмена',
      accept: () => clearAllFavorites(),
    });
  };

  return (
    <div className="space-y-8">
      {/**
       * Заголовочная секция страницы
       * @description
       * Приветственный блок с иконкой, заголовком и описанием.
       * Использует градиентные цвета для привлекательного вида.
       */}
      <div className="text-center py-8">
        {/**
         * Иконка избранного в круге
         * @description
         * Декоративная иконка с градиентным фоном.
         * Представляет концепцию избранных фильмов.
         */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-6">
          <span className="text-3xl">⭐</span>
        </div>

        {/**
         * Главный заголовок страницы
         * @description
         * Большой градиентный заголовок с названием страницы.
         * Адаптивный размер для разных экранов.
         */}
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Избранное
        </h1>

        {/**
         * Описание страницы
         * @description
         * Пояснительный текст о предназначении страницы.
         * Ограничен шириной для лучшей читаемости.
         */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ваша личная коллекция любимых фильмов и сериалов
        </p>
      </div>

      {/* Статистика и действия */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-red-50/50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              📊 Статистика
            </h2>
            <p className="text-lg text-gray-600">
              {favorites.length} {favorites.length === 1 ? 'фильм' :
                favorites.length < 5 ? 'фильма' : 'фильмов'} в избранном
            </p>
          </div>

          {favorites.length > 0 && (
            <Button
              label="Очистить все"
              icon="pi pi-trash"
              severity="danger"
              outlined
              onClick={handleClearAll}
              className="border-2 border-red-300 hover:border-red-400 hover:bg-red-50 transition-all duration-200"
            />
          )}
        </div>
      </Card>

      {favorites.length === 0 ? (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-red-50">
          <div className="text-center py-16">
            <div className="text-8xl mb-6">💔</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Избранное пусто
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Добавьте фильмы в избранное, чтобы они появились здесь. Начните с поиска интересных фильмов!
            </p>
            <Button
              label="Найти фильмы"
              icon="pi pi-search"
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            />
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <Card
              key={movie.imdbID}
              className="relative hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden group"
            >
              {/* Кнопка удаления */}
              <div className="absolute top-3 right-3 z-20">
                <Button
                  icon="pi pi-heart-fill"
                  severity="danger"
                  size="small"
                  rounded
                  text
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(movie.imdbID, movie.Title);
                  }}
                  tooltip="Удалить из избранного"
                  tooltipOptions={{ position: 'left' }}
                  className="bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                />
              </div>

              <div
                className="cursor-pointer"
                onClick={() => handleMovieClick(movie.imdbID)}
              >
                <div className="space-y-4">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white">
                          <p className="text-sm font-medium text-black bg-white/90 px-2 py-1 rounded">Подробнее</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-72 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl mb-2 block">🎬</span>
                        <span className="text-gray-600 font-medium">Постер недоступен</span>
                      </div>
                    </div>
                  )}

                  <div className="p-2">
                    <h4 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                      {movie.Title}
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {movie.Year}
                      </span>
                      <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full capitalize">
                        {movie.Type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog />
    </div>
  );
};

export default Favorites;
