import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AppBottomTabScreenProps} from '../../Navigation/AppRoutes';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';

export type HomeRouteParams = {};

export const HomeScreen: React.FC<AppBottomTabScreenProps<'Home'>> = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Home</Text>
      <Button text="Sign Out" onPress={signOut} />
    </View>
  );
};
