import React from 'react';
import {EditUserParams, EditUserScreen} from '../screens/editUser/EditUser';
import {
  SettingsRouteParams,
  SettingsScreen
} from '../screens/settings/Settings';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {Photos} from '../screens/Photos';

export type SettingsStackParamList = {
  EditUser: EditUserParams;
  Photos: {images: string[]; index: number};
  Settings: SettingsRouteParams;
};

export type SettingsStackNavigatorProps =
  StackScreenProps<SettingsStackParamList>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  StackScreenProps<SettingsStackParamList, T>;

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsRoutes: React.FC = () => {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="EditUser" component={EditUserScreen} />
      <SettingsStack.Screen name="Photos" component={Photos} />
    </SettingsStack.Navigator>
  );
};
