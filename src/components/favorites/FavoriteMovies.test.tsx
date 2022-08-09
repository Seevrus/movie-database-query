import renderer from 'react-test-renderer';
import movies from '../../test-data/movies';
import FavoriteMovies from './FavoriteMovies';

describe('ResultsPagination', () => {
  it('Should render correctly', () => {
    const component = renderer.create(
      <FavoriteMovies favoriteMovies={movies} setFocusedMovie={jest.fn()} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should render correctly if there is a focused movie', () => {
    const component = renderer.create(
      <FavoriteMovies
        favoriteMovies={movies}
        focusedMovie={movies[0]}
        setFocusedMovie={jest.fn()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
