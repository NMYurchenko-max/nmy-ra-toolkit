/**
 * Моковые данные для тестирования и демонстрации
 * @module utils/mockData
 */

import type { MovieDetails, SearchResponse } from '@/services/types/movie';

/**
 * Тестовые данные фильма "Guardians of the Galaxy Vol. 2"
 * Предоставлены пользователем для демонстрации функциональности
 */
export const MOCK_MOVIE_DATA: MovieDetails = {
  "Title": "Guardians of the Galaxy Vol. 2",
  "Year": "2017",
  "Rated": "PG-13",
  "Released": "05 May 2017",
  "Runtime": "136 min",
  "Genre": "Action, Adventure, Comedy",
  "Director": "James Gunn",
  "Writer": "James Gunn, Dan Abnett, Andy Lanning",
  "Actors": "Chris Pratt, Zoe Saldaña, Dave Bautista",
  "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
  "Language": "English",
  "Country": "United States",
  "Awards": "Nominated for 1 Oscar. 15 wins & 60 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "7.6/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "85%"
    },
    {
      "Source": "Metacritic",
      "Value": "67/100"
    }
  ],
  "Metascore": "67",
  "imdbRating": "7.6",
  "imdbVotes": "806,353",
  "imdbID": "tt3896198",
  "Type": "movie",
  "DVD": "N/A",
  "BoxOffice": "$389,813,101",
  "Production": "N/A",
  "Website": "N/A"
};

/**
 * Примеры результатов поиска для тестирования
 */
export const MOCK_SEARCH_RESULTS: SearchResponse = {
  "Search": [
    {
      "Title": "Guardians of the Galaxy Vol. 2",
      "Year": "2017",
      "imdbID": "tt3896198",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Guardians of the Galaxy",
      "Year": "2014",
      "imdbID": "tt2015381",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg"
    },
    {
      "Title": "Guardians of the Galaxy Vol. 3",
      "Year": "2023",
      "imdbID": "tt6791350",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
    }
  ],
  "totalResults": "3",
  "Response": "True"
};

/**
 * Дополнительные тестовые фильмы для карусели и избранного
 */
export const MOCK_MOVIES_LIST = [
  {
    "Title": "The Avengers",
    "Year": "2012",
    "imdbID": "tt0848228",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  },
  {
    "Title": "Iron Man",
    "Year": "2008",
    "imdbID": "tt0371746",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
  },
  {
    "Title": "Captain America: The First Avenger",
    "Year": "2011",
    "imdbID": "tt0458339",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg"
  },
  {
    "Title": "Thor",
    "Year": "2011",
    "imdbID": "tt0800369",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
  },
  {
    "Title": "Black Panther",
    "Year": "2018",
    "imdbID": "tt1825683",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg"
  }
];

/**
 * Функция для получения моковых данных фильма по ID
 * @param imdbID - ID фильма
 * @returns MovieDetails или null если фильм не найден
 */
export const getMockMovieById = (imdbID: string): MovieDetails | null => {
  const movies = [
    MOCK_MOVIE_DATA,
    ...MOCK_MOVIES_LIST.map(movie => ({
      ...movie,
      Rated: "PG-13",
      Released: "01 Jan 2020",
      Runtime: "120 min",
      Genre: "Action, Adventure",
      Director: "Unknown",
      Writer: "Unknown",
      Actors: "Unknown",
      Plot: "Test movie plot",
      Language: "English",
      Country: "USA",
      Awards: "None",
      Ratings: [
        {
          "Source": "Internet Movie Database",
          "Value": "7.0/10"
        }
      ],
      Metascore: "70",
      imdbRating: "7.0",
      imdbVotes: "100,000",
      DVD: "N/A",
      BoxOffice: "$100,000,000",
      Production: "N/A",
      Website: "N/A",
    } as MovieDetails))
  ];

  return movies.find(movie => movie.imdbID === imdbID) || null;
};

/**
 * Функция для мокового поиска фильмов
 * @param query - поисковый запрос
 * @returns SearchResponse
 */
export const mockSearchMovies = (query: string): SearchResponse => {
  if (!query || query.length < 2) {
    return {
      Search: [],
      totalResults: "0",
      Response: "False",
      Error: "Movie not found!"
    };
  }

  // Фильтруем фильмы по запросу
  const filteredMovies = MOCK_MOVIES_LIST.filter(movie =>
    movie.Title.toLowerCase().includes(query.toLowerCase())
  );

  return {
    Search: filteredMovies,
    totalResults: filteredMovies.length.toString(),
    Response: "True"
  };
};
