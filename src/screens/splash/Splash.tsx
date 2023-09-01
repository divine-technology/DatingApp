import React, {useContext, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './Splash.styles';
import {AuthContext} from '../../providers/context/Auth';

export type SplashProps = unknown;

export const SplashScreen: React.FC<SplashProps> = () => {
  const {getMe} = useContext(AuthContext);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <View style={styles.container}>
      <Image source={require('./dating-icon.jpg')} style={styles.image} />
      <Text style={styles.text}>Dating App</Text>
    </View>
  );
};
