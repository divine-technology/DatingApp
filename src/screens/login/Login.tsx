import React, {useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './Login.styles';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';
import {LoginUserDto} from '../../apiClient';
import {AuthContext} from '../../providers/context/Auth';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Icons from 'react-native-heroicons/solid';
import {AuthStackScreenProps} from '../../navigation/AuthRoutes';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {ControlledInput} from '../../components/Input/Input';

export type LoginRouteParams = {};
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Use correct email format!')
    .required('This field is required!'),
  password: yup
    .string()
    .min(6, 'Use at least 6 characters!')
    .required('This field is required!')
});

export const LoginScreen: React.FC<AuthStackScreenProps<'Login'>> = ({
  navigation
}) => {
  const {control, handleSubmit, setFocus} = useForm<LoginUserDto>({
    resolver: yupResolver(validationSchema)
  });

  const {signIn} = useContext(AuthContext);

  const onSubmit = (data: LoginUserDto) => {
    signIn(data);
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup', {});
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword', {});
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            style={{width: 100, height: 100, tintColor: '#fb5b5a'}}
            source={require('../../images/chat.png')}
          />
          <Text style={styles.logo}>Dating App</Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center'
          }}>
          <Text style={styles.loginHeaderText}>Login</Text>
          <View style={{width: '100%', marginBottom: 16}}>
            <ControlledInput
              control={control}
              name={'email'}
              placeholder={'Email...'}
              keyboardType={'email-address'}
              startAdornment={<Icons.EnvelopeIcon size={30} color="white" />}
              autoCapitalize={'none'}
              returnKeyType={'next'}
            />
            <ControlledInput
              control={control}
              name={'password'}
              placeholder={'Password...'}
              returnKeyType={'done'}
              startAdornment={<Icons.LockClosedIcon size={30} color="white" />}
              secureTextEntry
              autoCapitalize={'none'}
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
              variant={'outlined'}
              size={'small'}
              onPress={navigateToForgotPassword}
            />
            <Button
              text={'Sign Up'}
              size={'small'}
              variant={'outlined'}
              onPress={navigateToSignUp}
            />
          </View>
        </View>
      </View>
    </ScreenView>
  );
};
