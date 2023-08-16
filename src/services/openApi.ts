import Config from 'react-native-config';
import {ApiClient} from '../apiClient';
import {TOKEN} from './token';

class OpenApiClient {
  instance: ApiClient;
  constructor() {
    this.instance = new ApiClient({
      BASE: Config.API_URL ?? 'http://localhost:3000',
    });
  }

  private setToken() {
    TOKEN.get((error, result) => {
      console.log({APIURL: Config.API_URL});
      this.instance = new ApiClient({
        BASE: Config.API_URL ?? 'http://localhost:3000',
        TOKEN: result === null ? undefined : result,
      });
    });
  }

  public init() {
    this.setToken();
  }
}

export const openApi = new OpenApiClient();
