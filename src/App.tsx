import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import FavoriteMovies from './components/favorites/FavoriteMovies';
import Loading from './components/loading/Loading';
import { MovieList } from './components/movie-list/MovieList';
import { MovieListContext } from './components/movie-list/MovieListContext';
import ResultsPagination from './components/pagination/ResultsPagination';
import SearchForm from './components/search/SearchForm';
import { ConfigurationService, defaultApiConfiguration } from './model/ConfigurationService';
import { Movie } from './model/Movie';
import { ApiConfigurationT } from './types/api-configuration';
import { defaultMoviePagesState, MoviePagesT } from './types/movie-pages';

const App = () => {
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(true);
  const [areMoviesLoading, setAreMoviesLoading] = useState<boolean>(false);

  const [apiConfiguration, setApiConfiguration] = useState<ApiConfigurationT>(defaultApiConfiguration);

  const [activePage, setActivePage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const [movies, setMovies] = useState<MoviePagesT>(defaultMoviePagesState);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [focusedMovie, setFocusedMovie] = useState<Movie>();
  const currentMovies = focusedMovie
    ? [focusedMovie]
    : movies.movies.get(activePage) ?? [];

  useEffect(() => {
    ConfigurationService.getConfiguration().then(
      (configurationResponse) => {
        setApiConfiguration(configurationResponse);
        setIsComponentLoading(false);
      },
    );
  }, []);

  if (isComponentLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <FavoriteMovies
        favoriteMovies={favoriteMovies}
        focusedMovie={focusedMovie}
        setFocusedMovie={setFocusedMovie}
      />
      <SearchForm 
        setLoading={setAreMoviesLoading}
        movies={movies}
        setMovies={setMovies}
        activePage={activePage}
        setActivePage={setActivePage}
        setNumberOfPages={setNumberOfPages}
      />
      {(currentMovies.length !== 0 || areMoviesLoading) && (
        <>
          <ResultsPagination
            activePage={activePage}
            setActivePage={setActivePage}
            numberOfPages={numberOfPages}
          />
          <MovieListContext.Provider value={
            {
              configuration: apiConfiguration,
              favoriteMovies,
              setFavoriteMovies,
            }
          }>
            <MovieList
              isLoading={areMoviesLoading}
              movies={currentMovies}
            />
          </MovieListContext.Provider>
          <ResultsPagination
            activePage={activePage}
            setActivePage={setActivePage}
            numberOfPages={numberOfPages}
          />
        </>
      )}
    </Container>
  );
};

export default App;
