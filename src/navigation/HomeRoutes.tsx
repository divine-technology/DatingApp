import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {HomeRouteParams, HomeScreen} from '../screens/home/Home';
import {
  UserProfileScreen,
  UserProfileScreenProps
} from '../screens/userProfile/UserProfile';
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import {RootStackScreenProps} from './Routes';

export type HomeStackParamList = {
  Home: HomeRouteParams;
  UserProfile: UserProfileScreenProps;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type HomeStackCompositeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<HomeStackScreenProps<T>, RootStackScreenProps<'App'>>;

export type HomeNavigatorParams = NavigatorScreenParams<HomeStackParamList>;

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeRoutes: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
    </HomeStack.Navigator>
  );
};
