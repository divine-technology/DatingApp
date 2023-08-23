import React from 'react';
import {Text, View} from 'react-native';
import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery';
import {AppBottomTabScreenProps} from '../../Navigation/AppRoutes';

export type SettingsRouteParams = {};

export const SettingsScreen: React.FC<
  AppBottomTabScreenProps<'Settings'>
> = () => {
  const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);

  console.log({data}, {error}, {status});

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};
