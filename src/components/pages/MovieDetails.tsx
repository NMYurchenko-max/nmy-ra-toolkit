/**
 * Страница деталей фильма
 * @module components/pages/MovieDetails
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store/store';
import { getMovieDetailsAsync } from '@/redux/slices/moviesSlice';

/**
 * Страница с детальной информацией о фильме
 */
const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [imageError, setImageError] = useState(false);

  const {
    currentMovie,
    loading,
    error,
  } = useMovieSearch();

  const { toggleMovieFavorite, isFavorite } = useFavorites();

  const { movies } = useSelector((state: RootState) => state.movies);

  // Загружаем детали фильма при монтировании компонента
  useEffect(() => {
    if (id) {
      dispatch(getMovieDetailsAsync(id));
    }
  }, [id, dispatch]);

  // Находим фильм в результатах поиска для отображения базовой информации
  const searchMovie = movies.find(movie => movie.imdbID === id);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleToggleFavorite = () => {
    if (currentMovie) {
      toggleMovieFavorite(currentMovie);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <ProgressSpinner />
        <p className="mt-4 text-gray-600">Загрузка информации о фильме...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Message severity="error" text={error} />
        <Button
          label="Назад"
          icon="pi pi-arrow-left"
          onClick={handleBack}
          severity="secondary"
        />
      </div>
    );
  }

  if (!currentMovie && !searchMovie) {
    return (
      <div className="space-y-4">
        <Message severity="warn" text="Фильм не найден" />
        <Button
          label="Назад к поиску"
          icon="pi pi-search"
          onClick={() => navigate('/')}
        />
      </div>
    );
  }

  // Используем данные из поиска, если детальная информация еще не загружена
  const displayMovie = currentMovie || searchMovie;

  if (!displayMovie) return null;

  const isMovieFavorite = isFavorite(displayMovie.imdbID);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <Button
          label="Назад"
          icon="pi pi-arrow-left"
          onClick={handleBack}
          severity="secondary"
        />

        <Button
          label={isMovieFavorite ? "В избранном" : "В избранное"}
          icon={isMovieFavorite ? "pi pi-heart-fill" : "pi pi-heart"}
          onClick={handleToggleFavorite}
          severity={isMovieFavorite ? "danger" : "success"}
          outlined={!isMovieFavorite}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Постер фильма */}
        <div className="lg:col-span-1">
          <Card>
            {displayMovie.Poster && displayMovie.Poster !== 'N/A' && !imageError ? (
              <img
                src={displayMovie.Poster}
                alt={displayMovie.Title}
                className="w-full rounded"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-500">Постер недоступен</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Основная информация */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {displayMovie.Title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Tag value={displayMovie.Year} severity="info" />
                  <Tag value={displayMovie.Type} severity="success" />
                  {currentMovie?.Rated && (
                    <Tag value={currentMovie.Rated} severity="warning" />
                  )}
                </div>
              </div>

              {/* Рейтинг */}
              {currentMovie?.imdbRating && (
                <div className="flex items-center gap-4">
                  <div>
                    <Rating
                      value={parseFloat(currentMovie.imdbRating) / 2}
                      readOnly
                      stars={5}
                      cancel={false}
                    />
                  </div>
                  <div className="text-lg font-semibold">
                    {currentMovie.imdbRating}/10
                  </div>
                  <div className="text-gray-600">
                    ({currentMovie.imdbVotes} голосов)
                  </div>
                </div>
              )}

              {/* Детальная информация */}
              {currentMovie && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Жанр:</span> {currentMovie.Genre}
                    </div>
                    <div>
                      <span className="font-semibold">Режиссер:</span> {currentMovie.Director}
                    </div>
                    <div>
                      <span className="font-semibold">Актеры:</span> {currentMovie.Actors}
                    </div>
                    <div>
                      <span className="font-semibold">Продолжительность:</span> {currentMovie.Runtime}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Дата выхода:</span> {currentMovie.Released}
                    </div>
                    <div>
                      <span className="font-semibold">Страна:</span> {currentMovie.Country}
                    </div>
                    <div>
                      <span className="font-semibold">Язык:</span> {currentMovie.Language}
                    </div>
                    <div>
                      <span className="font-semibold">Награды:</span> {currentMovie.Awards}
                    </div>
                  </div>
                </div>
              )}

              {/* Сюжет */}
              {currentMovie?.Plot && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Сюжет</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentMovie.Plot}
                  </p>
                </div>
              )}

              {/* Рейтинги */}
              {currentMovie?.Ratings && currentMovie.Ratings.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Рейтинги</h3>
                  <div className="space-y-2">
                    {currentMovie.Ratings.map((rating: { Source: string; Value: string }, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{rating.Source}:</span>
                        <Tag value={rating.Value} severity="info" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
