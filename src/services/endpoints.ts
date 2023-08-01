import {AxiosRequestConfig, Method} from 'axios';

export enum EndpointEnum {
  getMe = 'getMe',
  getAllPokemonPaginated = 'getAllPokemonPaginated',
}

type Endpoints = {
  [key in EndpointEnum]: AxiosRequestConfig & {method: Method};
};

export const ENDPOINTS: Endpoints = {
  getMe: {
    method: 'GET',
  },
  getAllPokemonPaginated: {
    method: 'GET',
    url: 'pokemon',
  },
};
