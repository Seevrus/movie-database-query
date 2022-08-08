import { createContext } from 'react';
import { defaultApiConfiguration } from '../../model/ConfigurationService';
import { Movie } from '../../model/Movie';
import { ApiConfigurationT } from '../../types/api-configuration';

type MovielistContextT = {
  configuration: ApiConfigurationT;
  favoriteMovies: Movie[];
  setFavoriteMovies?: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const defaultConfiguration = {
  configuration: defaultApiConfiguration,
  favoriteMovies: [],
};

export const MovieListContext = createContext<MovielistContextT>(defaultConfiguration);
