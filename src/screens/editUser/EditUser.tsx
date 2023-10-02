import React, {useContext} from 'react';
import {AuthContext} from '../../providers/context/Auth';
import {styles} from './EditUser.styles';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import * as Icons from 'react-native-heroicons/solid';
import {useForm} from 'react-hook-form';
import {UpdateUserDto} from '../../apiClient';
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
import {PickerItem} from '../../components/PickerItem/PickerItem';
import {ControlledPicker, Picker} from '../../components/Picker/Picker';
import dayjs from 'dayjs';

const preferenceData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Both', value: 'both'}
];

const genderData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'}
];

const hobbies = [
  'Hiking',
  'Cycling',
  'Biking',
  'Gaming',
  'Programming',
  'Partying',
  'Netflix & Chill',
  'Shopping',
  'Painting',
  'Comics'
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
  age: yup
    .number()
    .default(0)
    .min(18, 'Must be older than 18')
    .required('This field is required!'),
  prefferedAgeFrom: yup
    .number()
    .default(0)
    .min(18, 'Must be older than 18')
    .max(90, 'Cannot be older than 90')
    .required('This field is required!'),
  prefferedAgeTo: yup
    .number()
    .default(0)
    .min(18, 'Must be older than 18')
    .max(90, 'Cannot be older than 90')
    .required('This field is required!')
    .test(
      'prefferedAgeTo',
      'Must be higher than from age',
      (value, context) => context.parent.prefferedAgeFrom <= value
    ),
  prefferedRadius: yup
    .number()
    .default(0)
    .min(1, 'Cannot be lower than 1')
    .max(1000000, 'Cannot be larger than 1 million miles')
    .required('This field is required!'),
  gender: yup
    .object()
    .test('preference', 'This field is required!', (data: any) => {
      if (data.value && data.label) {
        return true;
      }
      return false;
    }),
  hobbies: yup.array(),
  preference: yup
    .object()
    .test('preference', 'This field is required!', (data: any) => {
      if (data.value && data.label) {
        return true;
      }
      return false;
    })
});

export const EditUserScreen: React.FC<SettingsStackScreenProps<'EditUser'>> = ({
  navigation
}) => {
  const {getMe, user} = useContext(AuthContext);

  const {control, handleSubmit} = useForm<
    UpdateUserDto & {preference?: DropdownDefaultDataProps} & {
      gender?: DropdownDefaultDataProps;
    }
  >({
    defaultValues: {
      ...user,
      preference: {value: user?.preference, label: user?.preference},
      gender: {value: user?.gender, label: user?.gender},
      hobbies: user?.hobbies
    },
    resolver: yupResolver(validationSchema)
  });

  const {mutate: updateProfile} = useMutation<unknown, unknown, UpdateUserDto>(
    'updateProfile',
    data =>
      openApi.instance.user.usersControllerUpdateUser({
        id: `${user?._id}`,
        requestBody: data
      }),
    {
      onSuccess: _data => {
        getMe();
        navigation.navigate('Settings');
      },
      onError: () => {}
    }
  );

  const onSubmit = (
    data: UpdateUserDto & {preference?: DropdownDefaultDataProps} & {
      gender?: DropdownDefaultDataProps;
    }
  ) => {
    const updateUserData = {
      ...data,
      preference: data.preference?.value ?? data.preference,
      gender: data.gender?.value ?? data.gender,
      hobbies: data.hobbies
    };
    updateProfile(updateUserData);
  };

  return (
    <ScreenView scrollEnabled>
      <Text style={styles.userName}>Edit Profile</Text>
      <ControlledInput
        control={control}
        name={'firstName'}
        label={'First name'}
        placeholder={'Username...'}
        startAdornment={<Icons.UserIcon size={30} color="white" />}
        autoCapitalize={'none'}
        returnKeyType={'next'}
      />
      <ControlledInput
        control={control}
        name={'lastName'}
        label={'Last name'}
        placeholder={'Username...'}
        startAdornment={<Icons.UserIcon size={30} color="white" />}
        autoCapitalize={'none'}
        returnKeyType={'next'}
      />
      <ControlledInput
        control={control}
        name={'email'}
        label={'Email'}
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
        label={'Bio'}
        placeholder={'Bio...'}
        startAdornment={<Icons.SparklesIcon size={30} color="white" />}
        autoCapitalize={'none'}
        returnKeyType={'next'}
        multiline
      />
      <ControlledInput
        control={control}
        name={'age'}
        label={'Age'}
        placeholder={'Age...'}
        startAdornment={<Icons.CalendarDaysIcon size={30} color="white" />}
        keyboardType={'number-pad'}
        returnKeyType={'next'}
        type={'number'}
      />
      <ControlledDropdown
        control={control}
        name={'gender'}
        label={'Gender'}
        data={genderData}
        placeholder="Select your gender"
        labelField="label"
        valueField="value"
        renderLeftIcon={() => <Icons.FaceSmileIcon size={30} color={'white'} />}
      />
      <ControlledDropdown
        control={control}
        name={'preference'}
        label={'Preference'}
        data={preferenceData}
        placeholder="Select your preference"
        labelField="label"
        valueField="value"
        renderLeftIcon={() => <Icons.HeartIcon size={30} color={'white'} />}
      />
      <View style={{flexDirection: 'row', gap: 12}}>
        <View style={{flex: 1}}>
          <ControlledInput
            control={control}
            name={'prefferedAgeFrom'}
            label={'Preffered age from'}
            placeholder={'From...'}
            startAdornment={<Icons.CalendarDaysIcon size={30} color="white" />}
            keyboardType={'number-pad'}
            returnKeyType={'next'}
            type={'number'}
          />
        </View>
        <View style={{flex: 1}}>
          <ControlledInput
            control={control}
            name={'prefferedAgeTo'}
            label={'Preffered age to'}
            placeholder={'To...'}
            startAdornment={<Icons.CalendarDaysIcon size={30} color="white" />}
            keyboardType={'number-pad'}
            returnKeyType={'next'}
            type={'number'}
          />
        </View>
      </View>
      <ControlledInput
        control={control}
        name={'prefferedRadius'}
        label={'Preffered radius in miles'}
        placeholder={'Radius...'}
        startAdornment={<Icons.XCircleIcon size={30} color="white" />}
        keyboardType={'number-pad'}
        returnKeyType={'next'}
        type={'number'}
      />
      <View style={{marginVertical: 12}}>
        <Text
          style={{
            fontSize: 12,
            color: '#00000060',
            marginLeft: 18,
            marginBottom: 2
          }}>
          Hobbies
        </Text>
        <ControlledPicker control={control} name={'hobbies'} data={hobbies} />
      </View>
      <View style={{marginBottom: 16}}>
        <Button
          text={'Update profile'}
          variant={'outlined'}
          onPress={handleSubmit(onSubmit, error => console.log({error}))}
        />
      </View>
    </ScreenView>
  );
};
