import React from 'react';
import {Text, View} from 'react-native';
import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery';
import {AppBottomTabScreenProps} from '../../Navigation/AppRoutes';

export type MessagesRouteParams = {};

export const MessagesScreen: React.FC<
  AppBottomTabScreenProps<'Messages'>
> = () => {
  const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);

  console.log({data}, {error}, {status});

  return (
    <View>
      <Text>Messages</Text>
    </View>
  );
};
