import { ApiConfigurationResponseT, ApiConfigurationT } from '../types/api-configuration';
import { jsonFetch } from './utils';

export const defaultApiConfiguration = {
  baseUrl: 'https://image.tmdb.org/t/p/',
  size: 'w185',
};

const findAppropiatePosterSize = (
  posterSizes: ApiConfigurationResponseT['images']['poster_sizes'],
) => {
  if (posterSizes.find((sizeStr) => sizeStr === defaultApiConfiguration.size)) {
    return defaultApiConfiguration.size;
  }

  const MIN_SIZE = 150;
  const MAX_SIZE = 200;
  return posterSizes
    .filter((sizeStr) => {
      const size = +sizeStr.substring(1);
      return size >= MIN_SIZE && size < MAX_SIZE;
    })
    .shift();
};

export class ConfigurationService {
  static async getConfiguration(): Promise<ApiConfigurationT> {
    return jsonFetch<ApiConfigurationResponseT>('https://api.themoviedb.org/3/configuration', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    })
      .then(response => ({
        baseUrl: response.images.secure_base_url ?? response.images.base_url,
        size: findAppropiatePosterSize(response.images.poster_sizes),
      }))
      .catch(() => defaultApiConfiguration);
  }
}