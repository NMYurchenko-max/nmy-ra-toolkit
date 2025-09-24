import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '@/components/shared/ui/SearchBar/SearchBar';
import MovieCard from '@/components/entities/MovieCard/MovieCard';
import { type RootState } from '@/redux/store/store';

const HomePage: React.FC = () => {
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = (movieId: string) => {
    return favorites.some((movie) => movie.imdbID === movieId);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Поиск фильмов</h1>
        <p>Найдите информацию о любом фильме из базы OMDb</p>
        <SearchBar />
      </div>

      <div className="results-section">
        {loading && (
          <div className="loading">
            <p>Поиск фильмов...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Ошибка: {error}</p>
          </div>
        )}

        {movies.length > 0 && (
          <div className="movies-grid">
            <h2>Результаты поиска ({movies.length})</h2>
            <div className="movies-container">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={isFavorite(movie.imdbID)}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="no-results">
            <p>Введите название фильма для поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
