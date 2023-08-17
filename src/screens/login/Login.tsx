import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Login.styles';
import {useForm} from 'react-hook-form';
import {ControlledInput} from '../../components/input/Input';
import {Button} from '../../components/Button/Button';
import {LoginUserDto} from '../../apiClient';
import {AuthContext} from '../../providers/context/Auth';
import {Size, Variant} from '../../components/Button/Button.styles';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type LoginRouteParams = {};
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Use correct email format!')
    .required('This field is required!'),
  password: yup
    .string()
    .min(6, 'Use at least 6 characters!')
    .required('This field is required!'),
});

export const LoginScreen: React.FC<AuthStackScreenProps<'Login'>> = ({
  navigation,
}) => {
  const {control, handleSubmit} = useForm<LoginUserDto>({
    resolver: yupResolver(validationSchema),
  });

  const {signIn} = useContext(AuthContext);

  const onSubmit = (data: LoginUserDto) => {
    console.log('My data: ', data);
    signIn(data);
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup', {});
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword', {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dating App</Text>
      <Text style={styles.loginHeaderText}>Login</Text>
      <View style={{width: '100%', gap: 8, marginBottom: 16}}>
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email...'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          returnKeyType={'next'}
        />
        <ControlledInput
          control={control}
          name={'password'}
          placeholder={'Password...'}
          returnKeyType={'done'}
          secureTextEntry
          onEndEditing={handleSubmit(onSubmit)}
        />
      </View>
      <View style={{width: '100%', gap: 8}}>
        <Button
          text={'Login'}
          onPress={handleSubmit(onSubmit, error => console.log({error}))}
        />
        <Button
          text={'Forgot Password?'}
          variant={Variant.OUTLINED}
          size={Size.SMALL}
          onPress={navigateToForgotPassword}
        />
        <Button
          text={'Sign Up'}
          size={Size.SMALL}
          variant={Variant.OUTLINED}
          onPress={navigateToSignUp}
        />
      </View>
    </View>
  );
};
