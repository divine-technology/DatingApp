import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {Variant} from '../../components/Button/Button.styles';
import {TopTabScreenProps} from '../../navigation/AppRoutes';
import {UserRadiusDto, UserWithId} from '../../apiClient';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {CardSwiper} from '../../components/CardSwiper/CardSwiper';

export type HomeRouteParams = undefined;

export const HomeScreen: React.FC<TopTabScreenProps<'Home'>> = ({
  navigation,
}) => {
  const {user} = useContext(AuthContext);
  const [dataToPlayWith, setDataToPlayWith] = useState<UserWithId[]>();

  const {data, mutate: getUsersInRadius} = useMutation<
    unknown,
    unknown,
    UserRadiusDto
  >(
    'getUsersInRadius',
    data => {
      return openApi.instance.user.usersControllerGetRadius({
        requestBody: data,
      });
    },
    {
      onSuccess: data => {
        console.log('FETCHED USERS DATA: ', data);
        setDataToPlayWith(data as UserWithId[]);
      },
      onError: () => {},
    },
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

  const fuck = (thatUserId: string) => {
    console.log('LIKED', thatUserId);
    const holy = dataToPlayWith?.filter(
      userr => userr._id.toString() !== thatUserId,
    );
    console.log('GIVE ME SOMETHING MAN CMON: ', holy);
    setDataToPlayWith(holy);
  };

  return (
    <View>
      {test() ? (
        <View style={{padding: 24}}>
          {(dataToPlayWith as UserWithId[]) && (
            <CardSwiper
              users={dataToPlayWith as UserWithId[]}
              like={id => {
                fuck(id);
              }}
              dislike={() => console.log('DISLIKED')}
              profile={() => console.log('PROFILE')}
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
            variant={Variant.TEXT}
            onPress={() => navigation.navigate('SettingsStack')}
          />
        </>
      )}
    </View>
  );
};
