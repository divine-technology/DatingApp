import React from 'react';

import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery';
import {AppBottomTabScreenProps} from '../../Navigation/AppRoutes';

export type HomeRouteParams = {};

export const HomeScreen: React.FC<AppBottomTabScreenProps<'Home'>> = () => {
  const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);

  console.log({data}, {error}, {status});

  return <></>;
};
