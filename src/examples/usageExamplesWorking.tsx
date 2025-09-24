/**
 * Примеры использования моковых данных для тестирования
 * @module examples/usageExamples
 */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store/store';
import type { Movie } from '@/services/types/movie';

/**
 * Демонстрационный компонент для проверки импортов
 * @returns JSX элемент
 */
export const DemoComponent = () => {
  const [count, setCount] = useState(0);
  const favorites = useSelector((state: RootState) => state.favorites?.items || []);

  useEffect(() => {
    console.log('Demo component mounted');
  }, []);

  return (
    <div>
      <h2>Демонстрационный компонент</h2>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
      <p>Избранных фильмов: {favorites.length}</p>
    </div>
  );
};

/**
 * Пример 1: Использование данных для карусели
 */
export const carouselExample = {
  // Данные для карусели - берем из моковых данных
  movies: [] as Movie[],

  // Как использовать в компоненте:
  componentUsage: `
import { MOCK_MOVIES_LIST } from '@/utils/mockData';

const CarouselComponent = () => {
  return (
    <MovieCarousel
      movies={MOCK_MOVIES_LIST}
      title="Популярные фильмы"
    />
  );
};
  `
};

/**
 * Пример 2: Поиск фильмов
 */
export const searchExample = {
  // Пример поиска "Avengers"
  searchAvengers: {} as Movie,

  // Пример поиска "Iron"
  searchIron: {} as Movie,

  // Как использовать в компоненте:
  componentUsage: `
import { mockSearchMovies } from '@/utils/mockData';

const SearchComponent = () => {
  const [results, setResults] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    const searchResults = mockSearchMovies(query);
    setResults(searchResults.Search || []);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {results.map((movie: Movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};
  `
};

/**
 * Пример 3: Детальная информация о фильме
 */
export const movieDetailsExample = {
  // Guardians of the Galaxy Vol. 2
  guardiansMovie: {} as Movie,

  // Получение фильма по ID
  getMovieById: {} as Movie,

  // Как использовать в компоненте:
  componentUsage: `
import { getMockMovieById } from '@/utils/mockData';

const MovieDetailsPage = ({ movieId }: { movieId: string }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const movieData = getMockMovieById(movieId);
    setMovie(movieData || null);
  }, [movieId]);

  if (!movie) return <LoadingSpinner />;

  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <p>Режиссер: {movie.Director}</p>
      <p>Актеры: {movie.Actors}</p>
      <p>Рейтинг: {movie.imdbRating}</p>
    </div>
  );
};
  `
};

/**
 * Пример 4: Добавление в избранное
 */
export const favoritesExample = {
  // Пример добавления фильма в избранное
  addToFavorites: {} as Movie,

  // Как использовать в компоненте:
  componentUsage: `
import { useDispatch } from 'react-redux';
import { addToFavorites } from '@/redux/slices/favoritesSlice';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie));
  };

  return (
    <div>
      <h3>{movie.Title}</h3>
      <button onClick={handleAddToFavorites}>
        Добавить в избранное
      </button>
    </div>
  );
};
  `
};

/**
 * Пример 5: Статистика и графики
 */
export const statsExample = {
  // Данные для статистики
  moviesForStats: [] as Movie[],

  // Как использовать в компоненте:
  componentUsage: `
const ChartsPage = () => {
  const movies = [] as Movie[];

  // Статистика по годам
  const yearsStats = movies.reduce((acc, movie) => {
    const year = movie.Year;
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2>Статистика фильмов</h2>
      <div>
        <h3>Фильмы по годам:</h3>
        {Object.entries(yearsStats).map(([year, count]) => (
          <p key={year}>{year}: {count} фильмов</p>
        ))}
      </div>
    </div>
  );
};
  `
};

/**
 * Пример 6: Инициализация приложения с моковыми данными
 */
export const appInitializationExample = {
  // Включение мокового режима
  enableMockMode: `
import { setMockMode } from '@/services/api/omdbApi';

// Включить моковые данные (в main.tsx или App.tsx)
setMockMode(true);

// Теперь все API запросы будут использовать моковые данные
  `,

  // Заполнение начальными данными
  initialData: `
import { MOCK_MOVIES_LIST } from '@/utils/mockData';
import { setMovies } from '@/redux/slices/moviesSlice';

// Заполнить Redux store начальными данными
dispatch(setMovies(MOCK_MOVIES_LIST));
  `
};

/**
 * Пример 7: Тестирование поиска
 */
export const searchTestExamples = {
  // Поиск по полному названию
  searchByFullTitle: {} as Movie,

  // Поиск по части названия
  searchByPartialTitle: {} as Movie,

  // Поиск по году
  searchByYear: {} as Movie,

  // Пустой поиск
  emptySearch: {} as Movie,

  // Как тестировать:
  testScenarios: `
1. Поиск "Avengers" -> должны найти The Avengers
2. Поиск "Iron" -> должны найти Iron Man
3. Поиск "2012" -> должны найти фильмы 2012 года
4. Поиск "" -> пустой результат
5. Поиск "nonexistent" -> пустой результат
  `
};

/**
 * Пример 8: Работа с избранным
 */
export const favoritesWorkflowExample = {
  // Шаги работы с избранным:
  workflow: [
    "1. Найти фильм через поиск",
    "2. Нажать кнопку 'Добавить в избранное'",
    "3. Фильм сохраняется в Redux store",
    "4. Данные персистятся в localStorage",
    "5. Перейти на страницу 'Избранное'",
    "6. Увидеть сохраненные фильмы",
    "7. Можно удалить из избранное"
  ],

  // Пример кода:
  codeExample: `
import { useSelector, useDispatch } from 'react-redux';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  return (
    <div>
      <h1>Избранное</h1>
      {favorites?.map((movie: Movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <button onClick={() => handleRemoveFromFavorites(movie.imdbID)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};
  `
};
