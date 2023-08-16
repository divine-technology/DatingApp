import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './Login.styles';
import {useForm} from 'react-hook-form';
import {ControlledInput} from '../../components/input/Input';
import {Button} from '../../components/Button/Button';
import {LoginUserDto} from '../../apiClient';
import {AuthContext} from '../../providers/context/Auth';

export type LoginRouteParams = {};

export const LoginScreen: React.FC<AuthStackScreenProps<'Login'>> = ({
  navigation,
}) => {
  const {control, handleSubmit} = useForm<LoginUserDto>();

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
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email...'}
          placeholderTextColor={'#003f5c'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          returnKeyType={'next'}
        />
      </View>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'password'}
          placeholder={'Password...'}
          placeholderTextColor={'#003f5c'}
          returnKeyType={'done'}
          secureTextEntry
          onEndEditing={handleSubmit(onSubmit)}
        />
      </View>
      <Button text={'Forgot Password?'} onPress={navigateToForgotPassword} />
      <Button
        text={'Login'}
        onPress={handleSubmit(onSubmit, error => console.log({error}))}
      />
      <Button text={'Sign Up'} onPress={navigateToSignUp} />
    </View>
  );
};
