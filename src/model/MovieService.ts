import { SearchMoviesResponseT } from '../types/search-movies';
import { Movie } from './Movie';
import { jsonFetch } from './utils';

export class MovieService {
  static async searchMovies(query: string, page: number) {
    return jsonFetch<SearchMoviesResponseT>(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    }).then((response) => {
      return {
        query,
        pages: response.total_pages ?? 1,
        movies: (response.results ?? [])
          .map(movieResult => new Movie(movieResult))
          .sort((m1, m2) => (m2.voteAverage || 0) - (m1.voteAverage || 0)),
      };
    });
  }
}
