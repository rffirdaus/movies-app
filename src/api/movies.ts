import axios from "axios";

const API_KEY = "83d427c35928f3e8d5a5ae7a7e230ac0";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface MoviesResponse {
  movies: Movie[];
  totalResults: number;
}

export const fetchMovies = async (
  query: string,
  page: number,
  perPage: number
): Promise<MoviesResponse> => {
  const url = query ? `${BASE_URL}/search/movie` : `${BASE_URL}/movie/popular`;
  const response = await axios.get(url, {
    params: { api_key: API_KEY, query, page, perPage },
  });

  return {
    movies: response.data.results,
    totalResults: response.data.total_results,
  };
};
