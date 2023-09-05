import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {styles} from './Signup.styles';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';
import {CreateUserDto} from '../../apiClient';
import {AuthContext} from '../../providers/context/Auth';
import {Variant} from '../../components/Button/Button.styles';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AuthStackScreenProps} from '../../navigation/AuthRoutes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    <ScreenView>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>Dating App</Text>
        <Text style={styles.registerHeaderText}>Sign Up</Text>
        <View style={{width: '100%', gap: 8, marginBottom: 16}}>
          <ControlledInput
            control={control}
            name={'firstName'}
            placeholder={'First name...'}
            returnKeyType={'next'}
            onSubmitEditing={() => setFocus('lastName')}
          />
          <ControlledInput
            control={control}
            name={'lastName'}
            placeholder={'Last name...'}
            returnKeyType={'next'}
            onSubmitEditing={() => setFocus('email')}
          />
          <ControlledInput
            control={control}
            name={'email'}
            placeholder={'Email...'}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            onSubmitEditing={() => setFocus('password')}
          />
          <ControlledInput
            control={control}
            name={'password'}
            placeholder={'Password...'}
            secureTextEntry
            autoCapitalize={'none'}
            returnKeyType={'go'}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </View>
        <View style={{width: '100%', gap: 8}}>
          <Button text="Sign up" onPress={handleSubmit(onSubmit)} />
          <Button text="Login" onPress={navigateToLogin} variant={'outlined'} />
          <View />
        </View>
      </KeyboardAwareScrollView>
    </ScreenView>
  );
};
