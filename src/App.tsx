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
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    ConfigurationService.getConfiguration().then(setConfiguration);
  }, []);

  return (
    <Container fluid>
      <SearchForm setMovies={setMovies} />
      <ConfigurationContext.Provider value={configuration}>
        <MovieList movies={movies} />
      </ConfigurationContext.Provider>
    </Container>
  );
};

export default App;
