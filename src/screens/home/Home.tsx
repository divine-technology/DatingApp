import React, {useContext, useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {AuthUser, ResponsePaginateDto, UserRadiusDto} from '../../apiClient';
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
import ImagePicker from 'react-native-image-crop-picker';

export type HomeRouteParams = undefined;

export const HomeScreen: React.FC<HomeStackCompositeScreenProps<'Home'>> = ({
  navigation
}) => {
  const {user} = useContext(AuthContext);

  const [cardsData, setCardsData] = useState<AuthUser[]>(mockData);

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

  useEffect(() => {
    user?.location &&
      getUsersInRadius({location: user?.location, radius: 50000});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const test = () => {
    if (user?.gender && user.age && user.preference) {
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
    openCamera(id);
    console.log('LIKE', {id});
  };

  const dislike = (id: string | number) => {
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

  const openCamera = (id: string | number) => {
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
      }
    }, cardSwiperRef.current?.onBack);
  };

  return (
    <ScreenView>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          gap: 12,
          paddingBottom: 16
        }}>
        {test() ? (
          <>
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
                  onPress={() => cardSwiperRef.current?.manualSwipe('left')}
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
                  onPress={() => cardSwiperRef.current?.manualSwipe('right')}
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
          </>
        ) : (
          <>
            <Text style={{color: 'black', fontSize: 30}}>
              Profile not set up. You have to go to settings!
            </Text>
            <Button
              text="Finish profile"
              variant={'text'}
              onPress={() =>
                navigation.navigate('App', {
                  screen: 'SettingsStack',
                  params: {
                    screen: 'Settings'
                  }
                })
              }
            />
          </>
        )}
      </View>
    </ScreenView>
  );
};
