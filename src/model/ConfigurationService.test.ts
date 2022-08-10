import * as utils from './utils';
import configurationFetchResponse from '../test-data/configuration-fetch-response.json';
import { ConfigurationService } from './ConfigurationService';

describe('MovieService', () => {
  beforeEach(() => {
    jest.spyOn(utils, 'jsonFetch').mockResolvedValue(configurationFetchResponse);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getConfiguration', () => {
    it('should return configuration correctly', async () => {
      jest.spyOn(utils, 'jsonFetch').mockResolvedValue(configurationFetchResponse);

      const configuration = await ConfigurationService.getConfiguration();

      expect(configuration.baseUrl).toBe('https://base.url/x/y');
      expect(configuration.size).toBe('w185');
    });

    it('should return configuration correctly if there is no safe base url', async () => {
      const secureBaseUrl = configurationFetchResponse.images.secure_base_url;
      delete (configurationFetchResponse as any).images.secure_base_url;
      const configuration = await ConfigurationService.getConfiguration();

      expect(configuration.baseUrl).toBe('http://base.url/x/y');
      expect(configuration.size).toBe('w185');

      configurationFetchResponse.images.secure_base_url = secureBaseUrl;
    });

    it('should return configuration correctly if default poster size is not availble', async () => {
      const posterSizes = [ ...configurationFetchResponse.images.poster_sizes ];
      configurationFetchResponse.images.poster_sizes = [
        'w92',
        'w154',
        'w342',
        'w500',
        'w780',
        'original',
      ];

      const configuration = await ConfigurationService.getConfiguration();

      expect(configuration.baseUrl).toBe('https://base.url/x/y');
      expect(configuration.size).toBe('w154');

      configurationFetchResponse.images.poster_sizes = posterSizes;
    });
  });
});