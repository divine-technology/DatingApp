import React from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery';

export type LoginRouteParams = {};

export const LoginScreen: React.FC<AuthStackScreenProps<'Login'>> = () => {
  const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);

  console.log({data}, {error}, {status});

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};
