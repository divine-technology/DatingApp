import React from 'react';
import {HomeRouteParams, HomeScreen} from '../screens/home/Home';
import {
  MaterialTopTabNavigationEventMap,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {TopBar} from '../components/TopBar/TopBar';
import {
  NavigationHelpers,
  ParamListBase,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack'; // TODO: Tarik ispravi ovo
import {SettingsRoutes, SettingsStackParamList} from './SettingsRoutes';
import {SceneRendererProps} from 'react-native-tab-view';
import {MaterialTopTabDescriptorMap} from '@react-navigation/material-top-tabs/lib/typescript/src/types';

export type AppTopTabParamList = {
  Home: HomeRouteParams;
  SettingsStack: SettingsStackParamList;
};

type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> = {
  route: RouteProp<ParamList, RouteName>;
  navigation: StackNavigationProp<ParamList, RouteName>;
};

export type TopTabScreenProps<T extends keyof AppTopTabParamList> =
  ScreenComponentType<AppTopTabParamList, T>;

export type TopTabProps<T extends ParamListBase = ParamListBase> =
  SceneRendererProps & {
    state: TabNavigationState<T>;
    navigation: NavigationHelpers<T, MaterialTopTabNavigationEventMap>;
    descriptors: MaterialTopTabDescriptorMap;
  };

const TopTab = createMaterialTopTabNavigator<AppTopTabParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <TopTab.Navigator
      initialRouteName={'Home'}
      tabBar={TopBar}
      screenOptions={{swipeEnabled: false}}>
      <TopTab.Screen name={'Home'} component={HomeScreen} />
      <TopTab.Screen name={'SettingsStack'} component={SettingsRoutes} />
    </TopTab.Navigator>
  );
};
