import React from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';

export type ForgotPasswordRouteParams = {};

export const ForgotPasswordScreen: React.FC<
  AuthStackScreenProps<'ForgotPassword'>
> = () => {
  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
};
