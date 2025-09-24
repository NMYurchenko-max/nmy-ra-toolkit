export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Runtime?: string;
  imdbRating?: string;
  Released?: string;
  Rated?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Writer?: string; // Добавляем свойство Writer
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

// Aliases for compatibility with API service typings
export type MovieDetails = Movie;
export type SearchResponse = MovieSearchResponse;
