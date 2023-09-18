import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Pressable
} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {styles} from './Settings.styles';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import * as Icons from 'react-native-heroicons/outline';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import ImageView from 'react-native-image-viewing';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Section} from '../../components/Section/Section';
import {InfoContainer} from '../../components/InfoContainer/InfoContainer';
import {CustomModal} from '../../components/Modal/Modal';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {api} from '../../services/api';
import {CameraIcon} from 'react-native-heroicons/solid';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {themeColors} from '../../themes/colors';

export type SettingsRouteParams = undefined;

export const SettingsScreen: React.FC<SettingsStackScreenProps<'Settings'>> = ({
  navigation
}) => {
  const {getMe, signOut, user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [visible, setIsVisible] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useFocusEffect(React.useCallback(() => getMe(), []));

  const insets = useSafeAreaInsets();

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
  }, [isFocused]);

  const {mutate: deleteAccount} = useMutation<unknown, unknown, unknown>(
    'deleteAccount',
    _data => openApi.instance.user.usersControllerDeleteUser(),
    {
      onSuccess: _data => {
        signOut();
      },
      onError: () => {}
    }
  );

  const [images, setImages] = useState([
    {
      uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'
    },
    {
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34'
    },
    {
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111'
    }
  ]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Change Profile Picture',
          message:
            'The app needs permission to access your camera ' +
            'Would you like to grant permission?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const imageUpload = async (
    image: ImageOrVideo,
    uploadToGallery: boolean = false
  ) => {
    const formData = new FormData();
    const trimmedURI =
      Platform.OS === 'android'
        ? image.path
        : image.path.replace('file://', '');
    const fileName = trimmedURI.split('/').pop();
    const media = {
      name: fileName,
      height: image.height,
      width: image.width,
      type: image.mime,
      uri: trimmedURI
    };

    formData.append('image', media as unknown as Blob);

    try {
      if (!uploadToGallery) {
        const res = await api.axiosFetch({
          url: '/users/upload/profile-image',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        });
      } else {
        const res2 = await api.axiosFetch({
          url: '/users/upload/gallery-image',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        });
      }
      getMe();
    } catch (error) {
      console.log({error});
    }
  };

  const openCamera = (uploadToGallery: boolean = false) => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      useFrontCamera: true
    }).then(image => {
      if (image) {
        imageUpload(image, uploadToGallery);
      }
    });
  };

  const [profilePicture, setProfilePicture] = useState();

  const getProfilePicture = async () => {
    try {
      const res = await api.axiosFetch({
        url: `/image/${user?.profilePicture}`,
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        params: {
          dimensions: '300x300'
        }
      });
      setProfilePicture((res.data as any).url);
    } catch (error) {
      console.log({error});
    }
  };

  const getGallery = async () => {
    try {
      const res = await api.axiosFetch({
        url: `/users/gallery`,
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });
      console.log({res});
      setImages(res.data.map(item => ({uri: item.url})));
    } catch (e) {
      console.log({e});
    }
  };

  useEffect(() => {
    getGallery();
    getProfilePicture();
  }, []);

  return (
    <ScreenView scrollEnabled>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2
        }}>
        <Pressable
          style={{flexDirection: 'row', position: 'relative'}}
          onPress={() => openCamera()}>
          <Image
            style={styles.userImg}
            source={{
              uri: profilePicture
            }}
          />
          <View style={styles.cameraIconContainer}>
            <CameraIcon size={40} color={'#fb5b5a'} />
          </View>
        </Pressable>
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
      </View>
      <View style={{marginBottom: 4}}>
        <Section color={'#24355f'}>
          <Icons.UserCircleIcon size={25} color={'#24355f'} />
        </Section>
      </View>
      <View style={{flex: 1, flexDirection: 'row', gap: 4, marginBottom: 4}}>
        <InfoContainer
          title={user && user?.gender ? user.gender : 'Not set'}
          subTitle={'Gender'}
        />
        <InfoContainer
          title={user && user?.age ? user.age.toString() : 'Not set'}
          subTitle={'Age'}
        />
        <InfoContainer
          title={user && user?.preference ? user.preference : 'Not set'}
          subTitle={'Preference'}
        />
      </View>
      <View style={{marginBottom: 4}}>
        <InfoContainer
          title={'Bio'}
          subTitle={user && user.bio ? user.bio : 'No user bio.'}
        />
      </View>
      <View style={{marginBottom: 4}}>
        <InfoContainer
          title={'Images'}
          endAdornment={
            <Icons.PlusCircleIcon size={28} color={themeColors.primaryColor} />
          }
          onPress={() => openCamera(true)}>
          <View
            style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row'
            }}>
            {images.map((uri, index) => (
              <TouchableHighlight
                key={index}
                style={{
                  borderColor: '#fb5b5a90',
                  borderWidth: 1
                }}
                onPress={() => {
                  setImageIndex(index);
                  setIsVisible(!visible);
                }}>
                <Image
                  source={uri}
                  resizeMode="stretch"
                  style={{
                    width: (Dimensions.get('screen').width - 56) / 3,
                    height: (Dimensions.get('screen').width - 56) / 3
                  }}
                />
              </TouchableHighlight>
            ))}
          </View>
        </InfoContainer>
      </View>
      <ImageView
        images={images}
        presentationStyle="fullScreen"
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={({imageIndex}) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              paddingBottom: insets.bottom + 4
            }}>
            <Text style={styles.text}>{`${imageIndex + 1} / ${
              images.length
            }`}</Text>
          </View>
        )}
      />
      <Section color={'#24355f'}>
        <Icons.ShieldExclamationIcon size={25} color={'#24355f'} />
      </Section>
      <View style={styles.authBtnWrapper}>
        <View style={{flex: 1}}>
          <Button
            text="Update password"
            variant={'outlined'}
            onPress={() => {
              navigation.navigate('UpdatePassword');
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            text="Deactivate account"
            variant={'outlined'}
            onPress={() => setModalVisibility(true)}
          />
        </View>
      </View>
      <Section color={'#24355f'}>
        <Icons.NoSymbolIcon size={25} color={'#24355f'} />
      </Section>
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
      <CustomModal
        headerIcon={<Icons.ExclamationTriangleIcon size={100} color={'red'} />}
        headerText={
          'Are you sure you want to delete your account? This action cannot be undone.'
        }
        isVisible={modalVisibility}
        onBackButtonPress={() => setModalVisibility(false)}
        onBackdropPress={() => setModalVisibility(false)}
        backdropOpacity={0.4}
        useNativeDriver={true}
        primaryButtonOnPress={() => deleteAccount({})}
        secondaryButtonOnPress={() => setModalVisibility(false)}
      />
    </ScreenView>
  );
};
