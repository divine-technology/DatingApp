import React, {useContext, useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './Settings.styles';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import LinearGradient from 'react-native-linear-gradient';
import * as Icons from 'react-native-heroicons/outline';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';

export type SettingsRouteParams = undefined;

export const SettingsScreen: React.FC<SettingsStackScreenProps<'Settings'>> = ({
  navigation
}) => {
  const {getMe, signOut, user} = useContext(AuthContext);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     getMe();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFocused]);

  return (
    <ScreenView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
          }}
        />
        <Text style={styles.userName}>
          {user ? `${user.firstName} ${user.lastName}` : 'Test User'}
        </Text>
        <Text style={styles.aboutUser}>Short bio incoming.</Text>
        <View style={styles.userBtnWrapper}>
          <View style={{flex: 1}}>
            <Button
              text="Edit"
              variant={'outlined'}
              onPress={() => {
                navigation.navigate('EditUser');
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              text="Logout"
              variant={'outlined'}
              onPress={() => signOut()}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <Icons.UserCircleIcon size={25} color={'#00000095'} />
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {user && user?.gender ? user.gender : 'Not set'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Gender</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {user && user?.age ? user.age : 'Not set'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Age</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {user && user?.preference ? user.preference : 'Not set'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Preference</Text>
          </View>
        </View>
        <View style={styles.biocontainer}>
          <Text style={styles.bioTitle}>Bio</Text>
          <Text style={styles.bioSubTitle}>
            {user && user.bio ? user.bio : 'No user bio.'}
          </Text>
        </View>
        <Text style={styles.userName}>Images (to be added...)</Text>
      </ScrollView>
    </ScreenView>
  );
};
