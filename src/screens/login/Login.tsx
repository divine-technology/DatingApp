import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Login.styles';
import {useForm} from 'react-hook-form';
import {ControlledInput} from '../../input/Input';
/* import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery'; */

export type LoginRouteParams = {};

export const LoginScreen: React.FC<AuthStackScreenProps<'Login'>> = ({
  navigation,
}) => {
  //const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: any) => {
    console.log('My data: ', data);
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup', {});
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword', {});
  };

  //console.log({data}, {error}, {status});

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dating App</Text>
      <Text style={styles.loginHeaderText}>Login</Text>
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
      <TouchableOpacity onPress={navigateToForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
