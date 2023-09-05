import React, {useContext} from 'react';
import {AuthContext} from '../providers/context/Auth';
import {AppNavigatorParams, AppRoutes} from './AppRoutes';
import {AuthRoutes} from './AuthRoutes';
import {SplashScreen} from '../screens/splash/Splash';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Auth: undefined;
  App: AppNavigatorParams;
  Splash: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const RootStack = createStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  const {loggedIn, isLoading} = useContext(AuthContext);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {loggedIn && !isLoading && (
        <RootStack.Group>
          <RootStack.Screen name={'App'} component={AppRoutes} />
        </RootStack.Group>
      )}
      {!loggedIn && !isLoading && (
        <RootStack.Group>
          <RootStack.Screen name={'Auth'} component={AuthRoutes} />
        </RootStack.Group>
      )}
      <RootStack.Group>
        {isLoading && (
          <RootStack.Screen name={'Splash'} component={SplashScreen} />
        )}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
