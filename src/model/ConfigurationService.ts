import { ApiConfigurationResponseT, ApiConfigurationT } from '../types/api-configuration';
import { jsonFetch } from './utils';

export class ConfigurationService {
  static async getConfiguration(): Promise<ApiConfigurationT> {
    return jsonFetch<ApiConfigurationResponseT>('https://api.themoviedb.org/3/configuration', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    }).then(response => ({
      baseUrl: response.images.secure_base_url ?? response.images.base_url,
      size: 'w185',
    }));
  }
}