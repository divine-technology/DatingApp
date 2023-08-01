import React from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';

export type SignupRouteParams = {};

export const SignupScreen: React.FC<AuthStackScreenProps<'Signup'>> = ({}) => {
  return (
    <View>
      <Text>Signup</Text>
    </View>
  );
};
