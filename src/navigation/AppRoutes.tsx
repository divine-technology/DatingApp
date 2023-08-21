import React from 'react';
import {HomeRouteParams, HomeScreen} from '../screens/home/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SettingsRouteParams,
  SettingsScreen,
} from '../screens/settings/Settings';
import {TopBar} from '../components/TopBar/TopBar';

export type AppTopTabParamList = {
  Home: HomeRouteParams;
  Settings: SettingsRouteParams;
};

// export type AppBottomTabScreenProps<T extends keyof AppTopTabParamList> =
//   TopTabScreen<AppTopTabParamList, T>;

const TopTab = createMaterialTopTabNavigator<AppTopTabParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <TopTab.Navigator
      initialRouteName={'Home'}
      tabBar={TopBar}
      screenOptions={{swipeEnabled: false}}>
      <TopTab.Screen name={'Home'} component={HomeScreen} />
      <TopTab.Screen name={'Settings'} component={SettingsScreen} />
    </TopTab.Navigator>
  );
};
