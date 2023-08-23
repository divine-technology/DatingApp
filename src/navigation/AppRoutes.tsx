import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {HomeRouteParams, HomeScreen} from '../screens/home/Home';
import {
  SettingsRouteParams,
  SettingsScreen,
} from '../screens/settings/Settings';
import {
  MessagesRouteParams,
  MessagesScreen,
} from '../screens/messages/Messages';

export type AppBottomTabParamList = {
  Home: HomeRouteParams;
  Settings: SettingsRouteParams;
  Messages: MessagesRouteParams;
};

export type AppBottomTabScreenProps<T extends keyof AppBottomTabParamList> =
  BottomTabScreenProps<AppBottomTabParamList, T>;

const BottomTab = createBottomTabNavigator<AppBottomTabParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <BottomTab.Navigator initialRouteName={'Home'}>
      <BottomTab.Screen name={'Messages'} component={MessagesScreen} />
      <BottomTab.Screen name={'Home'} component={HomeScreen} />
      <BottomTab.Screen name={'Settings'} component={SettingsScreen} />
    </BottomTab.Navigator>
  );
};
