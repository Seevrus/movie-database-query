import renderer from 'react-test-renderer';
import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../../model/Movie';
import movies from '../../test-data/movies';

describe('MovieCard', () => {
  let contextSpy: jest.SpyInstance;
  const movie = new Movie({
    id: 1984,
    overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies molestie massa, sit amet mattis libero aliquet in. Proin id nunc nec sapien feugiat aliquam a sed erat. Suspendisse cursus nulla et felis varius rutrum. Aliquam tincidunt risus eget rhoncus dapibus. Donec a augue pellentesque, ultrices dolor quis, pulvinar ligula. Nunc dictum, dui in congue molestie, mi justo laoreet tortor, eget interdum lectus urna et mauris. In fringilla quam sem, ut posuere nisl luctus id.',
    poster_path: 'path/to/poster',
    release_date: '2027-07-07',
    title: 'Swimming Pool',
  });

  beforeEach(() => {
    contextSpy = jest.spyOn(React, 'useContext').mockReturnValue({
      configuration: {
        baseUrl: 'http://abc.de',
        size: 'w007',
      },
      favoriteMovies: movies,
      setFavoriteMovies: jest.fn(),
    });
  });

  afterAll(() => {
    contextSpy.mockRestore();
  });

  it('should render correctly', () => {
    const component = renderer.create(
      <MovieCard movie={movie} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render correctly if the movie is a favorite', () => {
    movie.id = 1;

    const component = renderer.create(
      <MovieCard movie={movie} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
