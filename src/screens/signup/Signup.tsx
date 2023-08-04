import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Signup.styles';
import {ControlledInput} from '../../input/Input';
import {useForm} from 'react-hook-form';

export type SignupRouteParams = {};

export const SignupScreen: React.FC<AuthStackScreenProps<'Signup'>> = ({
  navigation,
}) => {
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
      <Text style={styles.registerHeaderText}>Sign Up</Text>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'username'}
          isRequired={true}
          placeHolder={'Username...'}
          placeHolderTextColor={'#003f5c'}
        />
      </View>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'email'}
          isRequired={true}
          placeHolder={'Email...'}
          placeHolderTextColor={'#003f5c'}
        />
      </View>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'password'}
          isRequired={true}
          placeHolder={'Password...'}
          placeHolderTextColor={'#003f5c'}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
