import React, {useContext, useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {TopTabScreenProps} from '../../navigation/AppRoutes';
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
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';

export type HomeRouteParams = undefined;

export const HomeScreen: React.FC<TopTabScreenProps<'Home'>> = ({
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
    console.log('VIEW PROFILE', {id});
  };

  const like = (id: string | number) => {
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
            'The app needs permission to access your camera or photo gallery ' +
            'to change your profile picture. Would you like to grant permission?',
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

  const openCamera = () => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      useFrontCamera: true
    }).then(image => {
      if (image) {
        console.log('Swipe right', image);
      }
    });
  };

  return (
    <ScreenView>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          padding: 24,
          gap: 12
        }}>
        {test() ? (
          <View style={{flex: 1}}>
            {user && (
              <CardSwiper
                ref={cardSwiperRef}
                data={cardsData}
                card={card}
                removedCardsLimit={0}
                onSwipe={onSwipe}
                swipeableDirection={'vertical'}
                infinite
              />
            )}
          </View>
        ) : (
          <>
            <Text style={{color: 'black', fontSize: 30}}>
              Profile not set up. You have to go to settings!
            </Text>
            <Button
              text="Finish profile"
              variant={'text'}
              onPress={() => navigation.navigate('SettingsStack')}
            />
          </>
        )}
        <View style={{flexDirection: 'row'}}>
          <Button
            text="Dislike"
            width={'25%'}
            onPress={cardSwiperRef.current?.onBack}
          />
          <Button text="Like" width={'25%'} onPress={openCamera} />
          <Button
            text="Nesto"
            width={'25%'}
            onPress={cardSwiperRef.current?.onBack}
          />
          <Button
            text="Nesto"
            width={'25%'}
            onPress={cardSwiperRef.current?.onBack}
          />
        </View>
      </View>
    </ScreenView>
  );
};
