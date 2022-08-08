import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Loading from './components/loading/Loading';
import { MovieList } from './components/movie-list/MovieList';
import ResultsPagination from './components/pagination/ResultsPagination';
import SearchForm from './components/search/SearchForm';
import { ConfigurationService, defaultConfiguration } from './model/ConfigurationService';
import { ApiConfigurationT } from './types/api-configuration';
import { defaultMoviePagesState, MoviePagesT } from './types/movie-pages';

export const ConfigurationContext = createContext<ApiConfigurationT>(defaultConfiguration);

const App = () => {
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(true);
  const [areMoviesLoading, setAreMoviesLoading] = useState<boolean>(false);

  const [apiConfiguration, setApiConfiguration] = useState<ApiConfigurationT>(defaultConfiguration);

  const [activePage, setActivePage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const [movies, setMovies] = useState<MoviePagesT>(defaultMoviePagesState);
  const currentMovies = movies.movies.get(activePage) ?? [];

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
          <ConfigurationContext.Provider value={apiConfiguration}>
            <MovieList
              isLoading={areMoviesLoading}
              movies={currentMovies}
            />
          </ConfigurationContext.Provider>
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
