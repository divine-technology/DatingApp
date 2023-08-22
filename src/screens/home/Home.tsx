import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {useIsFocused} from '@react-navigation/native';
import {Variant} from '../../components/Button/Button.styles';
import {TopTabScreenProps} from '../../navigation/AppRoutes';

export type HomeRouteParams = undefined;

export const HomeScreen: React.FC<TopTabScreenProps<'Home'>> = ({
  navigation,
}) => {
  const {signOut, getMe, user} = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('HOW OFTEN: ', isFocused);
      getMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
        <Text style={{color: 'black', fontSize: 30}}>Home there is a user</Text>
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
      <Text>Home</Text>
      <Button text="Sign Out" onPress={signOut} />
    </View>
  );
};
