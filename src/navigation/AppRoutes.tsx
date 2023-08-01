import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {HomeRouteParams, HomeScreen} from '../screens/home/Home';

export type AppBottomTabParamList = {
  Home: HomeRouteParams;
};

export type AppBottomTabScreenProps<T extends keyof AppBottomTabParamList> =
  BottomTabScreenProps<AppBottomTabParamList, T>;

const BottomTab = createBottomTabNavigator<AppBottomTabParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <BottomTab.Navigator initialRouteName={'Home'}>
      <BottomTab.Screen name={'Home'} component={HomeScreen} />
    </BottomTab.Navigator>
  );
};
