import Axios, {AxiosRequestConfig, AxiosPromise, AxiosInstance} from 'axios';
import {TOKEN} from './token';
import Config from 'react-native-config';

class ApiFactory {
  private axios: AxiosInstance;

  private token?: string;

  constructor() {
    this.axios = Axios.create({
      baseURL: Config.API_URL ?? 'http://localhost:3000/'
    });
  }

  public init = async () => {
    this.token = await TOKEN.get();
    this.axios.interceptors.request.use(config => {
      config.headers.Authorization = 'Bearer ' + this.token;
      return config;
    });
  };

  public setToken(token: string) {
    this.token = token;
    this.axios.defaults.headers.common = {
      authorization: 'Bearer ' + token
    };
    TOKEN.set(token);
  }

  public axiosFetch<T, D>(
    request: AxiosRequestConfig<D | null | undefined>
  ): AxiosPromise<T> {
    const response = this.axios({
      ...request,
      headers: {
        ...this.axios.defaults.headers.common,
        ...request.headers
      }
    });
    return response;
  }
}

export const api = new ApiFactory();
