import React from 'react';
import {LoginRouteParams, LoginScreen} from '../screens/login/Login';
import {SignupRouteParams, SignupScreen} from '../screens/signup/Signup';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {
  ForgotPasswordRouteParams,
  ForgotPasswordScreen
} from '../screens/forgotPassword/ForgotPassword';

export type AuthStackParamList = {
  Login: LoginRouteParams;
  Signup: SignupRouteParams;
  ForgotPassword: ForgotPasswordRouteParams;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <AuthStack.Screen name={'Login'} component={LoginScreen} />
      <AuthStack.Screen name={'Signup'} component={SignupScreen} />
      <AuthStack.Screen
        name={'ForgotPassword'}
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};
