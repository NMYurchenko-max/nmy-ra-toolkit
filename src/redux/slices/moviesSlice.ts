import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '@/services/types/movie';

// API configuration - используем ваш личный ключ
const API_KEY = '20005ff3';
const API_BASE = 'https://www.omdbapi.com/';

// State
interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  query: string;
  totalResults: number; // numeric total results from API
  currentPage: number; // current page in OMDb pagination
  currentMovie?: Movie; // details of a single movie
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  query: '',
  totalResults: 0,
  currentPage: 1,
  currentMovie: undefined,
};

// Thunks
export const searchMoviesAsync = createAsyncThunk(
  'movies/searchMovies',
  async (
    { query, page = 1 }: { query: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      // Сначала пробуем реальное API
      const url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if (data.Response === 'False') {
        // Handle specific OMDb API errors
        if (data.Error === 'Too many results') {
          throw new Error('Слишком много результатов. Попробуйте более конкретный запрос (например, добавьте год или полное название фильма).');
        } else if (data.Error === 'Movie not found') {
          throw new Error('Фильм не найден. Проверьте правильность написания названия.');
        } else {
          throw new Error(data.Error || 'Фильмы не найдены');
        }
      }

      const movies: Movie[] = data.Search || [];
      const totalResults = parseInt(data.totalResults || '0', 10) || 0;

      return { movies, totalResults, query, page };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const getMovieDetailsAsync = createAsyncThunk(
  'movies/getMovieDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      // Сначала пробуем реальное API
      const url = `${API_BASE}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error || 'Movie not found');
      }

      return data as Movie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Set current page (used before/after load more scenarios)
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Reset movies and search state
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
      state.query = '';
      state.totalResults = 0;
      state.currentPage = 1;
      state.currentMovie = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search movies
      .addCase(searchMoviesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        const { movies, totalResults, query, page } = action.payload as {
          movies: Movie[];
          totalResults: number;
          query: string;
          page: number;
        };
        state.loading = false;
        state.error = null;
        state.query = query;
        state.totalResults = totalResults;
        state.currentPage = page;
        // If first page replace, otherwise append
        if (page === 1) {
          state.movies = movies;
        } else {
          // Dedup by imdbID
          const existing = new Set(state.movies.map((m) => m.imdbID));
          const toAdd = movies.filter((m) => !existing.has(m.imdbID));
          state.movies = [...state.movies, ...toAdd];
        }
        // Optionally set currentMovie to first result if not set
        if (!state.currentMovie && state.movies.length > 0) {
          state.currentMovie = state.movies[0];
        }
      })
      .addCase(searchMoviesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Search failed';
        state.movies = [];
        state.currentMovie = undefined;
        state.totalResults = 0;
      })
      // Movie details
      .addCase(getMovieDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload as Movie;
      })
      .addCase(getMovieDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to load details';
        state.currentMovie = undefined;
      });
  },
});

export const { setCurrentPage, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
