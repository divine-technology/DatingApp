import React, {useContext, useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {
  AuthUser,
  ReactWithUserDto,
  ResponsePaginateDto,
  UserRadiusDto
} from '../../apiClient';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {ClickableSwipableUserCard} from '../../components/UserCard/UserCard';
import {
  CardSwiper,
  CardSwiperRef,
  SwipeDirection
} from '../../components/CardSwiper/CardSwiper';
import {mockData} from './mockData';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {HomeStackCompositeScreenProps} from '../../navigation/HomeRoutes';
import * as Icons from 'react-native-heroicons/outline';
import {styles} from './Home.styles';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';
import {api} from '../../services/api';
import {themeColors} from '../../themes/colors';

export type HomeRouteParams = undefined;

export const HomeScreen: React.FC<HomeStackCompositeScreenProps<'Home'>> = ({
  navigation
}) => {
  const {getMe, user} = useContext(AuthContext);

  const [cardsData, setCardsData] = useState<AuthUser[]>([]);

  const {data, mutate: getUsersInRadius} = useMutation<
    unknown,
    unknown,
    UserRadiusDto
  >(
    'getUsersInRadius',
    data => {
      return openApi.instance.user.usersControllerGetRadius({
        requestBody: data
      });
    },
    {
      onSuccess: data => {
        setCardsData(
          (data as unknown as ResponsePaginateDto).data as unknown as AuthUser[]
        );
      },
      onError: () => {}
    }
  );

  const {mutate: dislikeUser} = useMutation<unknown, unknown, ReactWithUserDto>(
    'dislikeUser',
    data => {
      return openApi.instance.like.likeControllerReactWithUser({
        requestBody: data
      });
    },
    {
      onSuccess: data => {
        console.log('User disliked');
      },
      onError: () => {}
    }
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        user?.location &&
          getUsersInRadius({
            location: {
              type: 'Point',
              coordinates: [
                position?.coords?.latitude ?? 43.8328982,
                position?.coords?.longitude ?? 18.349589
              ]
            },
            radius: user.prefferedRadius ? user.prefferedRadius * 1609 : 700000
          });
      },
      error => console.log({error})
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const testProfileSetup = () => {
    if (
      user?.gender &&
      user.age &&
      user.preference &&
      user.profilePicture &&
      user.prefferedAgeFrom &&
      user.prefferedAgeTo &&
      user.prefferedRadius
    ) {
      return true;
    } else {
      return false;
    }
  };

  const testLastPictureTaken = () => {
    if (user?.lastPictureTaken) {
      console.log('LAST PICTURE TAKEN: ', user.lastPictureTaken);
      return true;
    } else {
      return false;
    }
  };

  const viewProfile = (id: string | number) => {
    if (id === 'NoId') return;
    console.log('VIEW PROFILE', {id});
    navigation.navigate('UserProfile', {userId: id.toString()});
  };

  const like = (id: string | number) => {
    openCamera(id, true);
    console.log('LIKE', {id});
  };

  const dislike = (id: string | number) => {
    dislikeUser({
      likedUserId: id.toString(),
      status: 'disliked'
    });
    console.log('DISLIKE', {id});
  };

  const onSwipe = (direction: SwipeDirection, id: string | number) => {
    if (direction === 'left') dislike(id);
    if (direction === 'right') like(id);
  };

  const card = (props: AuthUser) => {
    return (
      <ClickableSwipableUserCard
        user={props}
        like={() => like(props._id)}
        dislike={() => dislike(props._id)}
        profile={() => viewProfile(props._id)}
      />
    );
  };

  const cardSwiperRef = useRef<CardSwiperRef>(null);

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
    id: string,
    sendReaction: boolean = false
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
      const res = await api.axiosFetch({
        url: '/users/upload/selfie-image',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });
      console.log('Last picture taken uploaded!');
      const lastPictureTakenId = (res.data as any).lastPictureTaken;
      console.log('LAST PICTURE ID: ', lastPictureTakenId);
      if (sendReaction) {
        const res2 = await api.axiosFetch({
          url: '/likes/react',
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          data: {
            likedUserId: id,
            status: 'liked',
            likedPhotoUrl: lastPictureTakenId
          }
        });
        console.log({res2});
      } else {
        getMe();
      }
    } catch (error) {
      console.log({error});
    }
  };

  const openCamera = (id: string | number, sendReaction: boolean = false) => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      useFrontCamera: true
    }).then(image => {
      if (image) {
        console.log({image, id}, 'do request');
        imageUpload(image, id.toString(), sendReaction);
      }
    }, cardSwiperRef.current?.onBack);
  };

  return (
    <ScreenView>
      {testProfileSetup() ? (
        <>
          {testLastPictureTaken() ? (
            <>
              {cardsData.length !== 0 ? (
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    gap: 12,
                    paddingBottom: 16
                  }}>
                  <View style={{flex: 1}}>
                    {user && (
                      <CardSwiper
                        ref={cardSwiperRef}
                        data={cardsData}
                        card={card}
                        onSwipe={onSwipe}
                        swipeableDirection={'horizontal'}
                        infinite
                      />
                    )}
                  </View>
                  <View style={styles.reactButtonWrapper}>
                    <View
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2
                      }}>
                      <Icons.ArrowLeftCircleIcon
                        size={40}
                        color={'gray'}
                        strokeWidth={1}
                        onPress={cardSwiperRef.current?.onBack}
                      />
                    </View>
                    <View
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2
                      }}>
                      <Icons.XCircleIcon
                        size={55}
                        color={'red'}
                        strokeWidth={1}
                        onPress={() =>
                          cardSwiperRef.current?.manualSwipe('left')
                        }
                      />
                    </View>
                    <View
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2
                      }}>
                      <Icons.UserCircleIcon
                        size={40}
                        color={'#003f5c'}
                        strokeWidth={1}
                        onPress={() =>
                          viewProfile(
                            cardSwiperRef.current?.getCurrentCardId() ?? 'NoId'
                          )
                        }
                      />
                    </View>
                    <View
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2
                      }}>
                      <Icons.CheckCircleIcon
                        size={55}
                        strokeWidth={1}
                        color={'green'}
                        onPress={() =>
                          cardSwiperRef.current?.manualSwipe('right')
                        }
                      />
                    </View>
                    <View
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2
                      }}>
                      <Icons.CheckBadgeIcon
                        size={40}
                        color={'yellow'}
                        strokeWidth={1}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                  }}>
                  <Icons.FaceFrownIcon
                    size={200}
                    color={themeColors.primaryColor}
                  />
                  <Text
                    style={{
                      color: '#00000099',
                      fontSize: 36,
                      fontWeight: '600'
                    }}>
                    No more people...
                  </Text>
                  <Text
                    style={{
                      color: '#00000090',
                      fontSize: 20,
                      fontWeight: '400',
                      fontStyle: 'italic',
                      textAlign: 'center'
                    }}>
                    There is no more people in your area. Maybe change the
                    radius?
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}>
              <Icons.CameraIcon size={200} color={themeColors.primaryColor} />
              <Text
                style={{color: '#00000099', fontSize: 36, fontWeight: '600'}}>
                One more thing...
              </Text>
              <Text
                style={{
                  color: '#00000090',
                  fontSize: 20,
                  fontWeight: '400',
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                You just need to take a selfie that we will show to other
                people.
              </Text>
              <View style={{marginTop: 24, width: '100%'}}>
                <Button
                  text="Take picture"
                  variant={'filled'}
                  shape={'round'}
                  onPress={() => openCamera(user!!._id, false)}
                />
              </View>
            </View>
          )}
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
          <Icons.Cog8ToothIcon size={200} color={themeColors.primaryColor} />
          <Text style={{color: '#00000099', fontSize: 36, fontWeight: '600'}}>
            Alert
          </Text>
          <Text
            style={{
              color: '#00000090',
              fontSize: 20,
              fontWeight: '400',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
            Profile not yet set up. You have to go to settings and finish up
            your profile!
          </Text>
          <View style={{marginTop: 24, width: '100%'}}>
            <Button
              text="Finish profile"
              variant={'filled'}
              shape={'round'}
              onPress={() =>
                navigation.navigate('App', {
                  screen: 'SettingsStack',
                  params: {
                    screen: 'Settings'
                  }
                })
              }
            />
          </View>
        </View>
      )}
    </ScreenView>
  );
};
