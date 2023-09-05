import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './Settings.styles';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import * as Icons from 'react-native-heroicons/outline';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import ImageView from 'react-native-image-viewing';
import {TouchableHighlight} from 'react-native-gesture-handler';

export type SettingsRouteParams = undefined;

export const SettingsScreen: React.FC<SettingsStackScreenProps<'Settings'>> = ({
  navigation
}) => {
  const {getMe, signOut, user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [visible, setIsVisible] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
  }, [isFocused]);

  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'
    },
    {
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34'
    },
    {
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111'
    }
  ];

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
        <View style={styles.galleryContainer}>
          {images.map((uri, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => {
                setImageIndex(index);
                setIsVisible(!visible);
              }}>
              <Image
                source={uri}
                resizeMode="stretch"
                style={{
                  borderColor: 'white',
                  borderWidth: 1,
                  width: (Dimensions.get('screen').width - 34) / 3,
                  height: (Dimensions.get('screen').width - 34) / 3
                }}
              />
            </TouchableHighlight>
          ))}
        </View>
        <ImageView
          images={images}
          FooterComponent={() => (
            <View
              style={{
                width: '100%',
                height: 150,
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                paddingBottom: 40
              }}>
              <Text style={styles.text}>{`${imageIndex + 1} / ${
                images.length
              }`}</Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>
                <TouchableOpacity onPress={() => setImageIndex(imageIndex - 1)}>
                  <Text style={{color: 'white', fontSize: 18}}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setImageIndex(imageIndex + 1)}>
                  <Text style={{color: 'white', fontSize: 18}}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          presentationStyle="fullScreen"
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <Icons.ShieldExclamationIcon size={25} color={'#00000095'} />
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View style={styles.authBtnWrapper}>
          <View style={{flex: 1}}>
            <Button
              text="Update password"
              variant={'outlined'}
              onPress={() => {
                navigation.navigate('EditUser');
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              text="Deactivate account"
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
          <Icons.NoSymbolIcon size={25} color={'#00000095'} />
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View style={styles.authBtnWrapper}>
          <Button
            text="Blocked users"
            variant={'filled'}
            width={'50%'}
            onPress={() => {
              navigation.navigate('BlockedUsers');
            }}
          />
        </View>
      </ScrollView>
    </ScreenView>
  );
};
