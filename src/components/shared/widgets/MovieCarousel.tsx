/**
 * Карусель для избранных фильмов
 * @module components/shared/widgets/MovieCarousel
 */

import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/services/types/movie';

/**
 * Интерфейс для пропсов карусели
 */
interface MovieCarouselProps {
  movies: Movie[];
  onRemoveMovie?: (movieId: string) => void;
}

/**
 * Шаблон элемента карусели
 */
const movieTemplate = (movie: Movie, onRemoveMovie?: (movieId: string) => void, navigate?: (path: string) => void) => {
  const handleCardClick = () => {
    navigate?.(`/movie/${movie.imdbID}`);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveMovie?.(movie.imdbID);
  };

  return (
    <div className="p-2">
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={handleCardClick}
      >
        {onRemoveMovie && (
          <div className="absolute top-2 right-2 z-10">
            <Button
              icon="pi pi-times"
              severity="danger"
              size="small"
              rounded
              text
              onClick={handleRemoveClick}
              tooltip="Удалить из избранного"
            />
          </div>
        )}

        <div className="text-center">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-48 object-cover rounded mb-3"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded mb-3 flex items-center justify-center">
              <span className="text-gray-500">Нет постера</span>
            </div>
          )}

          <h4 className="font-semibold text-sm line-clamp-2 mb-1">
            {movie.Title}
          </h4>
          <p className="text-gray-600 text-xs">{movie.Year}</p>
        </div>
      </Card>
    </div>
  );
};

/**
 * Карусель для отображения избранных фильмов
 */
const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onRemoveMovie }) => {
  const navigate = useNavigate();

  if (movies.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🎬</div>
        <p className="text-gray-600">Нет избранных фильмов</p>
      </div>
    );
  }

  return (
    <div className="movie-carousel">
      <Carousel
        value={movies}
        numVisible={4}
        numScroll={1}
        responsiveOptions={[
          {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
          },
          {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
          },
          {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
          }
        ]}
        itemTemplate={(movie) => movieTemplate(movie, onRemoveMovie, navigate)}
        showIndicators={movies.length > 4}
        showNavigators={movies.length > 1}
        circular={false}
        autoplayInterval={3000}
        className="custom-carousel"
      />
    </div>
  );
};

export default MovieCarousel;
