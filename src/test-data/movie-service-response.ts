import { Movie } from '../model/Movie';
import movieSearchResult from './movie-search-response.json';

const movieServiceResponse = {
  query: 'star',
  pages: 1,
  movies: [
    new Movie(movieSearchResult.results[1]),
    new Movie(movieSearchResult.results[2]),
    new Movie(movieSearchResult.results[0]),
  ],
};

export default movieServiceResponse;
