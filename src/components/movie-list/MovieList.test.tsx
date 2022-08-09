import renderer from 'react-test-renderer';
import movies from '../../test-data/movies';
import { MovieList } from './MovieList';

describe('MovieList', () => {
  it('should render correctly if there are no movies', () => {
    const component = renderer.create(
      <MovieList isLoading={false} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render correctly if results are loading', () => {
    const component = renderer.create(
      <MovieList isLoading movies={[]} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const component = renderer.create(
      <MovieList isLoading={false} movies={movies} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
