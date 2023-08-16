import React from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Signup.styles';
import {ControlledInput} from '../../components/input/Input';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';
import {useMutation} from 'react-query';
import {CreateUserDto} from '../../apiClient';
import {openApi} from '../../services/openApi';

export type SignupRouteParams = {};

export const SignupScreen: React.FC<AuthStackScreenProps<'Signup'>> = ({
  navigation,
}) => {
  const {control, handleSubmit} = useForm<CreateUserDto>();

  const {data, mutate} = useMutation<unknown, unknown, CreateUserDto>(
    ['user'],
    data =>
      openApi.instance.user.usersControllerCreateUser({
        requestBody: data,
      }),
  );

  const onSubmit = (data: CreateUserDto) => {
    mutate(data);
  };

  console.log({data});

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
          name={'name'}
          placeholder={'Username...'}
          placeholderTextColor={'#003f5c'}
        />
      </View>
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
      <Button text="Sign up" onPress={handleSubmit(onSubmit)} />
      <Button text="Login" onPress={navigateToLogin} />
    </View>
  );
};
