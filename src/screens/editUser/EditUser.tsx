import React, {useContext} from 'react';
import {AuthContext} from '../../providers/context/Auth';
import {SafeAreaView} from 'react-navigation';
import {styles} from './EditUser.styles';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import * as Icons from 'react-native-heroicons/solid';
import {ControlledInput} from '../../components/input/Input';
import {useForm} from 'react-hook-form';
import {UpdateUserDto} from '../../apiClient';

export type EditUserParams = undefined;

export const EditUserScreen: React.FC = () => {
  const {control, handleSubmit} = useForm<UpdateUserDto>({});

  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>Edit Profile</Text>
        <ControlledInput
          control={control}
          name={'name'}
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
      </ScrollView>
    </SafeAreaView>
  );
};
