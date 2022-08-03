import { SearchMoviesT } from '../types/search-movies';
import { Movie } from './Movie';
import { jsonFetch } from './utils';

export class Movies {
  movies: Movie[];

  constructor() {
    this.movies = [];
  }

  async searchMovies(query: string) {
    return jsonFetch<SearchMoviesT>(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&page=1&include_adult=false`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    }).then((response) => {
      this.movies = (response.results ?? []).map(movieResult => new Movie(movieResult));
    });
  }
}
