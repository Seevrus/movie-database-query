import { SearchMoviesResponseT } from '../types/search-movies';
import { Movie } from './Movie';
import { jsonFetch } from './utils';

export class MovieService {
  static async searchMovies(query: string) {
    return jsonFetch<SearchMoviesResponseT>(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&page=1&include_adult=false`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    }).then((response) => {
      return (response.results ?? [])
        .map(movieResult => new Movie(movieResult))
        .sort((m1, m2) => (m2.voteAverage || 0) - (m1.voteAverage || 0));
    });
  }
}
