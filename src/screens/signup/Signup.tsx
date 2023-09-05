import React, {useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './Signup.styles';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';
import {CreateUserDto} from '../../apiClient';
import {AuthContext} from '../../providers/context/Auth';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Icons from 'react-native-heroicons/solid';
import {AuthStackScreenProps} from '../../navigation/AuthRoutes';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {ControlledInput} from '../../components/Input/Input';

export type SignupRouteParams = {};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'Use at least 3 characters!')
    .max(15, 'Name cannot be longer than 15 characters!')
    .required('This field is required!'),
  lastName: yup
    .string()
    .min(3, 'Use at least 3 characters!')
    .max(15, 'Last name cannot be longer than 15 characters!')
    .required('This field is required!'),
  email: yup
    .string()
    .email('Use correct email format!')
    .required('This field is required!'),
  password: yup
    .string()
    .min(6, 'Use at least 6 characters!')
    .required('This field is required!')
});

export const SignupScreen: React.FC<AuthStackScreenProps<'Signup'>> = ({
  navigation
}) => {
  const {control, handleSubmit, setFocus} = useForm<CreateUserDto>({
    resolver: yupResolver(validationSchema)
  });

  const {signUp} = useContext(AuthContext);

  const onSubmit = (data: CreateUserDto) => {
    signUp(data);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login', {});
  };

  return (
    <ScreenView safeAreaTop>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 24
        }}>
        <Text style={styles.logo}>Dating App</Text>
        <Image
          resizeMode="contain"
          style={{width: 150, height: 150, tintColor: '#fb5b5a'}}
          source={require('../../images/chat.png')}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center'
          }}>
          <View style={{width: '100%', marginBottom: 16}}>
            <ControlledInput
              control={control}
              name={'firstName'}
              placeholder={'First name...'}
              startAdornment={<Icons.UserCircleIcon size={30} color="white" />}
              returnKeyType={'next'}
              onSubmitEditing={() => setFocus('lastName')}
            />
            <ControlledInput
              control={control}
              name={'lastName'}
              startAdornment={<Icons.UserCircleIcon size={30} color="white" />}
              placeholder={'Last name...'}
              returnKeyType={'next'}
              onSubmitEditing={() => setFocus('email')}
            />
            <ControlledInput
              control={control}
              name={'email'}
              placeholder={'Email...'}
              startAdornment={<Icons.EnvelopeIcon size={30} color="white" />}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              returnKeyType={'next'}
              onSubmitEditing={() => setFocus('password')}
            />
            <ControlledInput
              control={control}
              name={'password'}
              placeholder={'Password...'}
              startAdornment={<Icons.LockClosedIcon size={30} color="white" />}
              secureTextEntry
              autoCapitalize={'none'}
              returnKeyType={'go'}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          </View>
          <View style={{width: '100%', gap: 8}}>
            <Button text="Sign up" onPress={handleSubmit(onSubmit)} />
            <Button
              text="Login"
              onPress={navigateToLogin}
              variant={'outlined'}
              size={'small'}
            />
          </View>
        </View>
      </View>
    </ScreenView>
  );
};
