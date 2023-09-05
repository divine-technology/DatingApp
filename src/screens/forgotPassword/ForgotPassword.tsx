import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './ForgotPassword.styles';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AuthStackScreenProps} from '../../navigation/AuthRoutes';
import {ControlledInput} from '../../components/Input/Input';

export type ForgotPasswordRouteParams = {};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Use correct email format!')
    .required('This field is required!')
});

export const ForgotPasswordScreen: React.FC<
  AuthStackScreenProps<'ForgotPassword'>
> = () => {
  const {control, handleSubmit, setFocus} = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    console.log('My data: ', data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dating App</Text>
      <Text style={styles.forgotHeaderText}>Forgot Password</Text>
      <View style={{width: '100%', gap: 8, marginBottom: 16}}>
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email...'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          returnKeyType={'go'}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>
      <View style={{width: '100%', gap: 8}}>
        <Button text={'Send mail'} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};
