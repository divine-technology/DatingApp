import React from 'react';
import {EditUserParams, EditUserScreen} from '../screens/editUser/EditUser';
import {
  SettingsRouteParams,
  SettingsScreen
} from '../screens/settings/Settings';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {
  BlockedRouteParams,
  BlockedUsersScreen
} from '../screens/blockedUsers/BlockedUsers';
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import {RootStackScreenProps} from './Routes';
import {
  UpdatePasswordParams,
  UpdatePasswordScreen
} from '../screens/updatePassword/UpdatePassword';

export type SettingsStackParamList = {
  EditUser: EditUserParams;
  Settings: SettingsRouteParams;
  BlockedUsers: BlockedRouteParams;
  UpdatePassword: UpdatePasswordParams;
};

export type SettingsStackNavigatorProps =
  StackScreenProps<SettingsStackParamList>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  StackScreenProps<SettingsStackParamList, T>;

export type SettingsNavigatorParams =
  NavigatorScreenParams<SettingsStackParamList>;

export type SettingsStackCompositeScreenProps<
  T extends keyof SettingsStackParamList
> = CompositeScreenProps<
  SettingsStackScreenProps<T>,
  RootStackScreenProps<'App'>
>;

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsRoutes: React.FC = () => {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="EditUser" component={EditUserScreen} />
      <SettingsStack.Screen
        name="BlockedUsers"
        component={BlockedUsersScreen}
      />
      <SettingsStack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
      />
    </SettingsStack.Navigator>
  );
};
