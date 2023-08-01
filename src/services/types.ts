import {EndpointEnum} from './endpoints';

export type EndpointResponseData<T = EndpointEnum> =
  T extends EndpointEnum.getMe
    ? User
    : T extends EndpointEnum.getAllPokemonPaginated
    ? PaginatedData<Pokemon>
    : unknown;

export type EndpointRequestData<T = EndpointEnum> =
  T extends EndpointEnum.getAllPokemonPaginated ? undefined : unknown;

export type EndpointErrorData = unknown;

export type Pokemon = {
  name: string;
  url: string;
};

export type User = {
  name: string;
  email: string;
  token: string;
};

type PaginatedData<T> = {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
};
