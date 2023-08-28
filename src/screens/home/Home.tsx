import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
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
        console.log('FETCHED USERS DATA: ', data);
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

  return (
    <View style={{flexDirection: 'column', flex: 1, padding: 24, gap: 12}}>
      {test() ? (
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
      <Button text="Back" onPress={cardSwiperRef.current?.onBack} />
    </View>
  );
};
