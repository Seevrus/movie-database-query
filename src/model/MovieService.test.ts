import * as utils from './utils';
import movieSearchResponse from '../test-data/movie-search-response.json';
import movieServiceResponse from '../test-data/movie-service-response';
import { MovieService } from './MovieService';

describe('MovieService', () => {
  beforeEach(() => {
    jest.spyOn(utils, 'jsonFetch').mockResolvedValue(movieSearchResponse);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('searchMovies', () => {
    it('should return movies correctly', async () => {
      const movies = await MovieService.searchMovies('star', 42);

      expect(movies.query).toBe('star');
      expect(movies.pages).toBe(1);
      expect(movies.movies).toEqual(movieServiceResponse.movies);
    });
  });
});
