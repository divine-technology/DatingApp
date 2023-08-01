import {api} from './api';
import {ENDPOINTS, EndpointEnum} from './endpoints';
import {
  UseQueryResult,
  useQuery as useReactQuery,
  useMutation as useReactMutation,
  UseMutationResult,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';
import {
  EndpointErrorData,
  EndpointRequestData,
  EndpointResponseData,
} from './types';
import {AxiosRequestConfig} from 'axios';

const fetch = async <T extends EndpointEnum>(
  endpoint: T,
  axiosRequestConfig?: AxiosRequestConfig<
    EndpointRequestData<T> | null | undefined
  >,
) => {
  const response = await api.axiosFetch<
    EndpointResponseData<T>,
    EndpointRequestData<T>
  >({
    ...ENDPOINTS[endpoint],
    ...axiosRequestConfig,
  });
  if (!response.data) {
    throw new Error('Problem fetching data');
  }
  return response.data;
};

/*{
  Use for Get requests
}*/

export const useQuery = <T extends EndpointEnum>(
  endpoint: T,
  axiosRequestConfig?: AxiosRequestConfig<
    EndpointRequestData<T> | null | undefined
  >,
  options?: Omit<
    UseQueryOptions<
      EndpointResponseData<T>,
      EndpointErrorData,
      EndpointResponseData<T>,
      T
    >,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<EndpointResponseData<T>, EndpointErrorData> => {
  return useReactQuery(
    endpoint,
    () => fetch(endpoint, axiosRequestConfig),
    options,
  );
};

/*{
  Use for Create, Update and Delete requests
}*/

export const useMutation = <T extends EndpointEnum>(
  endpoint: T,
  axiosRequestConfig?: AxiosRequestConfig<
    EndpointRequestData<T> | null | undefined
  >,
  options?: Omit<
    UseMutationOptions<
      EndpointResponseData<T>,
      EndpointErrorData,
      EndpointRequestData<T>,
      T
    >,
    'queryKey' | 'queryFn'
  >,
): UseMutationResult<
  EndpointResponseData<T>,
  EndpointErrorData,
  EndpointRequestData<T>
> => {
  return useReactMutation(
    endpoint,
    () => fetch(endpoint, axiosRequestConfig),
    options,
  );
};
