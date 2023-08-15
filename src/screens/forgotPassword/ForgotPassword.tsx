import React from 'react';
import {Text, View} from 'react-native';
import {AuthStackScreenProps} from '../../Navigation/AuthRoutes';
import {styles} from './ForgotPassword.styles';
import {ControlledInput} from '../../components/input/Input';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/Button/Button';

export type ForgotPasswordRouteParams = {};

export const ForgotPasswordScreen: React.FC<
  AuthStackScreenProps<'ForgotPassword'>
> = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: any) => {
    console.log('My data: ', data);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login', {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dating App</Text>
      <Text style={styles.forgotHeaderText}>Forgot Password</Text>
      <View style={styles.inputView}>
        <ControlledInput
          control={control}
          name={'email'}
          isRequired={true}
          placeHolder={'Email...'}
          placeHolderTextColor={'#003f5c'}
        />
      </View>
      <Button text={'Send mail'} onPress={handleSubmit(onSubmit)} />
      <Button text={'Back to Login'} onPress={navigateToLogin} />
    </View>
  );
};
