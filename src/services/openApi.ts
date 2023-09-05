import Config from 'react-native-config';
import {ApiClient} from '../apiClient';
import {TOKEN} from './token';

class OpenApiClient {
  instance: ApiClient;
  constructor() {
    this.instance = new ApiClient({
      BASE: Config.API_URL ?? 'http://localhost:3000'
    });
  }

  private setToken(callback?: () => void) {
    TOKEN.get((error, result) => {
      this.instance = new ApiClient({
        BASE: Config.API_URL ?? 'http://localhost:3000',
        TOKEN: result === null ? undefined : result
      });
      callback && callback();
    });
  }

  public init(callback?: () => void) {
    this.setToken(callback);
  }
}

export const openApi = new OpenApiClient();
