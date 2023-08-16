import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Login.styles';
import {useForm} from 'react-hook-form';
import {ControlledInput} from '../../components/input/Input';
import {Button} from '../../components/Button/Button';
import {LoginUserDto} from '../../apiClient';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
/* import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery'; */

export type LoginRouteParams = {};

export const LoginScreen: React.FC<AuthStackScreenProps<'Login'>> = ({
  navigation,
}) => {
  //const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);
  const {control, handleSubmit} = useForm<LoginUserDto>();
  const {data, error, mutate} = useMutation<unknown, unknown, LoginUserDto>(
    ['user'],
    data =>
      openApi.instance.auth.authControllerLoginUser({
        requestBody: data,
      }),
  );

  console.log({data}, {error}, 'Should be token');

  const onSubmit = (data: LoginUserDto) => {
    console.log('My data: ', data);
    mutate(data);
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
          placeholder={'Email...'}
          placeholderTextColor={'#003f5c'}
        />
      </View>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'password'}
          placeholder={'Password...'}
          placeholderTextColor={'#003f5c'}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Button text={'Forgot Password?'} onPress={navigateToForgotPassword} />
      <Button
        text={'Login'}
        onPress={handleSubmit(onSubmit, error => console.log({error}))}
      />
      <Button text={'Sign Up'} onPress={navigateToSignUp} />
    </View>
  );
};
