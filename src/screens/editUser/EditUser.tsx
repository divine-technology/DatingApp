import React, {useContext} from 'react';
import {AuthContext} from '../../providers/context/Auth';
import {SafeAreaView} from 'react-navigation';
import {styles} from './EditUser.styles';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import * as Icons from 'react-native-heroicons/solid';
import {ControlledInput} from '../../components/input/Input';
import {useForm} from 'react-hook-form';
import {UpdateUserDto} from '../../apiClient';
import {Button} from '../../components/Button/Button';
import {Variant} from '../../components/Button/Button.styles';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  ControlledDropdown,
  DropdownDefaultDataProps,
} from '../../components/Dropdown/Dropdown';

const preferenceData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Both', value: 'both'},
];

const genderData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

export type EditUserParams = undefined;

export type UpdateProfile = {
  updateProfile: (data: UpdateUserDto) => void;
};

const validationSchema = yup.object<UpdateUserDto>({
  firstName: yup
    .string()
    .min(3, 'Name must be at least 3 characters long!')
    .max(15, 'Name cannot be longer than 15 characters!')
    .required('This field is required!'),
  lastName: yup
    .string()
    .min(3, 'Name must be at least 3 characters long!')
    .max(15, 'Last name cannot be longer than 15 characters!')
    .required('This field is required!'),
  email: yup
    .string()
    .email('Use correct email format!')
    .required('This field is required!'),
  bio: yup.string().max(150, 'Bio can have maximum of 150 characters!'),
  age: yup.number().default(0).min(18).required('This field is required!'),
  gender: yup
    .object()
    .test('preference', 'This field is required!', (data: any) => {
      if (data.value && data.label) {
        return true;
      }
      return false;
    }),
  preference: yup
    .object()
    .test('preference', 'This field is required!', (data: any) => {
      if (data.value && data.label) {
        return true;
      }
      return false;
    }),
});

export const EditUserScreen: React.FC<SettingsStackScreenProps<'EditUser'>> = ({
  navigation,
}) => {
  const {getMe, user} = useContext(AuthContext);

  const {control, handleSubmit, watch} = useForm<
    UpdateUserDto & {preference?: DropdownDefaultDataProps} & {
      gender?: DropdownDefaultDataProps;
    }
  >({
    defaultValues: {
      ...user,
      preference: {value: user?.preference, label: user?.preference},
      gender: {value: user?.gender, label: user?.gender},
    },
    resolver: yupResolver(validationSchema),
  });

  const age = watch('age');
  console.log({user, age});

  const {mutate: updateProfile} = useMutation<unknown, unknown, UpdateUserDto>(
    'updateProfile',
    data =>
      openApi.instance.user.usersControllerUpdateUser({
        id: `${user?._id}`,
        requestBody: data,
      }),
    {
      onSuccess: _data => {
        console.log('SOMETHING HAPPENED');
        getMe();
        navigation.navigate('Settings');
      },
      onError: () => {},
    },
  );

  const onSubmit = (
    data: UpdateUserDto & {preference?: DropdownDefaultDataProps} & {
      gender?: DropdownDefaultDataProps;
    },
  ) => {
    const updateUserData = {
      ...data,
      preference: data.preference?.value ?? data.preference,
      gender: data.gender?.value ?? data.gender,
    };
    console.log('My data: ', {data});
    updateProfile(updateUserData);
  };

  return (
    <SafeAreaView style={{flex: 1, paddingVertical: 16}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>Edit Profile</Text>
        <ControlledInput
          control={control}
          name={'firstName'}
          placeholder={'Username...'}
          startAdornment={<Icons.UserIcon size={30} color="white" />}
          autoCapitalize={'none'}
          returnKeyType={'next'}
        />
        <ControlledInput
          control={control}
          name={'lastName'}
          placeholder={'Username...'}
          startAdornment={<Icons.UserIcon size={30} color="white" />}
          autoCapitalize={'none'}
          returnKeyType={'next'}
        />
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email...'}
          keyboardType={'email-address'}
          startAdornment={
            <Icons.EnvelopeIcon width={'100%'} height={'100%'} color="white" />
          }
          autoCapitalize={'none'}
          returnKeyType={'next'}
        />
        <ControlledInput
          control={control}
          name={'bio'}
          placeholder={'Bio...'}
          startAdornment={<Icons.SparklesIcon size={30} color="white" />}
          autoCapitalize={'none'}
          returnKeyType={'next'}
          multiline
        />
        <ControlledInput
          control={control}
          name={'age'}
          placeholder={'Age...'}
          startAdornment={<Icons.CalendarDaysIcon size={30} color="white" />}
          keyboardType={'number-pad'}
          returnKeyType={'next'}
          type={'number'}
        />
        <ControlledDropdown
          control={control}
          name={'gender'}
          data={genderData}
          placeholder="Select your gender"
          labelField="label"
          valueField="value"
          renderLeftIcon={() => (
            <Icons.FaceSmileIcon size={30} color={'white'} />
          )}
        />
        <ControlledDropdown
          control={control}
          name={'preference'}
          data={preferenceData}
          placeholder="Select your preference"
          labelField="label"
          valueField="value"
          renderLeftIcon={() => <Icons.HeartIcon size={30} color={'white'} />}
        />
      </ScrollView>
      <View style={{paddingHorizontal: 16}}>
        <Button
          text={'Update profile'}
          variant={Variant.OUTLINED}
          onPress={handleSubmit(onSubmit, error => console.log({error}))}
        />
      </View>
    </SafeAreaView>
  );
};
