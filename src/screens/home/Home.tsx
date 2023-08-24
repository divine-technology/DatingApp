import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {Variant} from '../../components/Button/Button.styles';
import {TopTabScreenProps} from '../../navigation/AppRoutes';
import {UserRadiusDto} from '../../apiClient';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {UserCard} from '../../components/UserCard/UserCard';

export type HomeRouteParams = undefined;

export const HomeScreen: React.FC<TopTabScreenProps<'Home'>> = ({
  navigation,
}) => {
  const {user} = useContext(AuthContext);

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

  return (
    <View>
      {test() ? (
        <View style={{padding: 24}}>
          {user && (
            <UserCard
              user={user}
              like={() => console.log('LIKED')}
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
