import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Loading from './components/loading/Loading';
import { MovieList } from './components/movie-list/MovieList';
import SearchForm from './components/search/SearchForm';
import { ConfigurationService, defaultConfiguration } from './model/ConfigurationService';
import { Movie } from './model/Movie';
import { ApiConfigurationT } from './types/api-configuration';

export const ConfigurationContext = createContext<ApiConfigurationT>(defaultConfiguration);

const App = () => {
  const [configuration, setConfiguration] = useState<ApiConfigurationT>(defaultConfiguration);
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(true);
  const [areMoviesLoading, setAreMoviesLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    ConfigurationService.getConfiguration().then(
      (configurationResponse) => {
        setConfiguration(configurationResponse);
        setIsComponentLoading(false);
      },
    );
  }, []);

  if (isComponentLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <SearchForm setLoading={setAreMoviesLoading} setMovies={setMovies} />
      <ConfigurationContext.Provider value={configuration}>
        <MovieList isLoading={areMoviesLoading} movies={movies} />
      </ConfigurationContext.Provider>
    </Container>
  );
};

export default App;
