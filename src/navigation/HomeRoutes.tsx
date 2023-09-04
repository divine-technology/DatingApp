import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import { HomeRouteParams, HomeScreen } from '../screens/home/Home';
import { UserProfileScreen, UserProfileScreenProps } from '../screens/userProfile/UserProfile';

export type HomeStackParamList = {
  Home: HomeRouteParams;
  UserProfile: UserProfileScreenProps;
};

export type HomeStackNavigatorProps =
  StackScreenProps<HomeStackParamList>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T, 'App'>;

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeRoutes: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
    </HomeStack.Navigator>
  );
};
