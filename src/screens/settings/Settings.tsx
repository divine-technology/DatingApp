import React, {useContext, useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {Variant} from '../../components/Button/Button.styles';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './Settings.styles';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';

export type SettingsRouteParams = undefined;

export const SettingsScreen: React.FC<SettingsStackScreenProps<'Settings'>> = ({
  navigation,
}) => {
  const {getMe, signOut, user} = useContext(AuthContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('HOW OFTEN: ', isFocused);
      getMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <Text style={styles.userName}>{user ? user.name : 'Test User'}</Text>
        <Text style={styles.aboutUser}>
          {user && user.bio ? user.bio : 'No user bio.'}
        </Text>
        <View style={styles.userBtnWrapper}>
          <View style={{flex: 1}}>
            <Button
              text="Edit"
              variant={Variant.FILLED}
              onPress={() => {
                navigation.navigate('EditUser');
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              text="Logout"
              variant={Variant.FILLED}
              onPress={() => signOut()}
            />
          </View>
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

        <Text style={styles.userName}>Images (to be added...)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
