import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './ForgotPassword.styles';
import {ControlledInput} from '../../input/Input';
import {useForm} from 'react-hook-form';

export type ForgotPasswordRouteParams = {};

export const ForgotPasswordScreen: React.FC<
  AuthStackScreenProps<'ForgotPassword'>
> = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: any) => {
    console.log('My data: ', data);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login', {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dating App</Text>
      <Text style={styles.forgotHeaderText}>Forgot Password</Text>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'email'}
          isRequired={true}
          placeHolder={'Email...'}
          placeHolderTextColor={'#003f5c'}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginText}>Send mail</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};
