import React from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Signup.styles';
import {ControlledInput} from '../../components/input/Input';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';
import {useMutation} from 'react-query';
import {ApiClient} from '../../apiClient/ApiClient';
import {CreateUserDto} from '../../apiClient';

export type SignupRouteParams = {};

export const SignupScreen: React.FC<AuthStackScreenProps<'Signup'>> = ({
  navigation,
}) => {
  const {control, handleSubmit} = useForm<CreateUserDto>();

  const api = new ApiClient({BASE: 'http://localhost:3000/'});

  const {data, mutate} = useMutation('signup', user =>
    api.user.usersControllerCreateUser({
      requestBody: user as unknown as CreateUserDto,
    }),
  );

  const onSubmit = (data: any) => {
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
      <Button text="Sign up" onPress={handleSubmit(onSubmit)} />
      <Button text="Login" onPress={navigateToLogin} />
    </View>
  );
};
