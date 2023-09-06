import React, {useContext} from 'react';
import {AuthContext} from '../../providers/context/Auth';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import * as Icons from 'react-native-heroicons/solid';
import {useForm} from 'react-hook-form';
import {ChangePasswordDto, UpdateUserDto} from '../../apiClient';
import {Button} from '../../components/Button/Button';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  ControlledDropdown,
  DropdownDefaultDataProps
} from '../../components/Dropdown/Dropdown';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {ControlledInput} from '../../components/Input/Input';
import {styles} from './UpdatePassword.styles';

export type UpdatePasswordParams = undefined;

const validationSchema = yup.object<Partial<ChangePasswordDto>>({
  oldPassword: yup.string().required('This field is required!'),
  newPassword: yup.string().required('This field is required!'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('This field is required!')
});

export const UpdatePasswordScreen: React.FC<
  SettingsStackScreenProps<'UpdatePassword'>
> = ({navigation}) => {
  const {getMe, user} = useContext(AuthContext);

  const {control, handleSubmit} = useForm<Partial<ChangePasswordDto>>({
    resolver: yupResolver(validationSchema)
  });

  const {mutate: updatePassword} = useMutation<
    unknown,
    unknown,
    ChangePasswordDto
  >(
    'updateProfile',
    data =>
      openApi.instance.auth.authControllerUpdatePassword({requestBody: data}),
    {
      onSuccess: _data => {
        getMe();
        navigation.navigate('Settings');
      },
      onError: () => {}
    }
  );

  const onSubmit = (data: Partial<ChangePasswordDto>) => {
    const updatePasswordData = {
      email: user?.email ?? '',
      oldPassword: data.oldPassword ?? '',
      newPassword: data.newPassword ?? '',
      confirmNewPassword: data.confirmNewPassword ?? ''
    };
    updatePassword(updatePasswordData);
  };

  return (
    <ScreenView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>Update Password</Text>
        <ControlledInput
          control={control}
          name={'oldPassword'}
          placeholder={'Old Password...'}
          startAdornment={<Icons.ClockIcon size={30} color="white" />}
          autoCapitalize={'none'}
          secureTextEntry
          returnKeyType={'next'}
        />
        <ControlledInput
          control={control}
          name={'newPassword'}
          placeholder={'New Password...'}
          startAdornment={<Icons.LockClosedIcon size={30} color="white" />}
          autoCapitalize={'none'}
          secureTextEntry
          returnKeyType={'next'}
        />
        <ControlledInput
          control={control}
          name={'confirmNewPassword'}
          placeholder={'Confirm New Password...'}
          startAdornment={
            <Icons.ArrowPathRoundedSquareIcon
              width={'100%'}
              height={'100%'}
              color="white"
            />
          }
          autoCapitalize={'none'}
          secureTextEntry
          returnKeyType={'next'}
        />
      </ScrollView>
      <View style={{paddingHorizontal: 16}}>
        <Button
          text={'Update password'}
          variant={'outlined'}
          onPress={handleSubmit(onSubmit, error => console.log({error}))}
        />
      </View>
    </ScreenView>
  );
};
