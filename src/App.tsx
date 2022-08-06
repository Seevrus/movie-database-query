import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MovieList } from './components/movie-list/MovieList';
import SearchForm from './components/search/SearchForm';
import { ConfigurationService, defaultConfiguration } from './model/ConfigurationService';
import { Movie } from './model/Movie';
import { ApiConfigurationT } from './types/api-configuration';

export const ConfigurationContext = createContext<ApiConfigurationT>(defaultConfiguration);

const App = () => {
  const [configuration, setConfiguration] = useState<ApiConfigurationT>(defaultConfiguration);
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setIsComponentLoading(true);
    ConfigurationService.getConfiguration().then(
      (configurationResponse) => {
        setConfiguration(configurationResponse);
        setIsComponentLoading(false);
      },
    );
  }, []);

  return (
    <Container fluid>
      <SearchForm setLoading={setIsComponentLoading} setMovies={setMovies} />
      <ConfigurationContext.Provider value={configuration}>
        <MovieList isLoading={isComponentLoading} movies={movies} />
      </ConfigurationContext.Provider>
    </Container>
  );
};

export default App;
