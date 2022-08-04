/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import SearchForm from './components/search/SearchForm';
import { ConfigurationService } from './model/ConfigurationService';
import { Movie } from './model/Movie';
import { ApiConfigurationT } from './types/api-configuration';

const App = () => {
  const [configuration, setConfiguration] = useState<ApiConfigurationT>();
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(configuration);
  // console.log(movies);

  useEffect(() => {
    ConfigurationService.getConfiguration().then(setConfiguration);
  }, []);

  return <SearchForm setMovies={setMovies} />;
};

export default App;
