import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import * as Icons from 'react-native-heroicons/outline';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {styles} from './UserProfile.styles';
import {HomeStackScreenProps} from '../../navigation/HomeRoutes';
import {useQuery} from 'react-query';
import {openApi} from '../../services/openApi';
import {AuthUser} from '../../apiClient';

export type UserProfileScreenProps = {
  userId: string;
};

export const UserProfileScreen: React.FC<
  HomeStackScreenProps<'UserProfile'>
> = ({route}) => {
  const {userId} = route.params;

  const {data} = useQuery(['chat', userId], () =>
    openApi.instance.user.usersControllerGetOneUser({
      id: userId
    })
  );

  const [user, setUser] = useState<AuthUser>();

  useEffect(() => {
    if (data) {
      setUser(data as unknown as AuthUser);
    }
  }, [data]);

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
        <Text style={styles.aboutUser}>Location incoming.</Text>
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
