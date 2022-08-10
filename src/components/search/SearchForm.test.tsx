import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer, { act } from 'react-test-renderer';
import { MovieService } from '../../model/MovieService';
import movieServiceResponse from '../../test-data/movie-service-response';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest
      .spyOn(MovieService, 'searchMovies')
      .mockResolvedValue(movieServiceResponse);
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const component = renderer.create(
      <SearchForm
        movies={{
          query: '',
          pages: 42,
          movies: new Map(),
        }}
        setLoading={jest.fn()}
        setMovies={jest.fn()}
        activePage={1}
        setActivePage={jest.fn()}
        setNumberOfPages={jest.fn()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should query for movies', async () => {
    const setActivePageMock = jest.fn();
    const setLoadingMock = jest.fn();
    const setMoviesMock = jest.fn();
    const setNumberOfPagesMock = jest.fn();
  
    render(
      <SearchForm
        movies={{
          query: '',
          pages: 42,
          movies: new Map(),
        }}
        setLoading={setLoadingMock}
        setMovies={setMoviesMock}
        activePage={1}
        setActivePage={setActivePageMock}
        setNumberOfPages={setNumberOfPagesMock}
      />,
    );

    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: 'Keresett film:' }), 'star',
      );
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(setLoadingMock).toHaveBeenCalledTimes(2);
    });

    expect(setActivePageMock).toHaveBeenCalledWith(1);

    expect(setLoadingMock).toHaveBeenCalledTimes(2);
    expect(setLoadingMock).toHaveBeenNthCalledWith(1, true);
    expect(setLoadingMock).toHaveBeenNthCalledWith(2, false);

    expect(setMoviesMock).toHaveBeenCalledWith({
      query: 'star',
      pages: 1,
      movies: new Map().set(1, movieServiceResponse.movies),
    });

    expect(setNumberOfPagesMock).toHaveBeenCalledWith(1);
  });
});
