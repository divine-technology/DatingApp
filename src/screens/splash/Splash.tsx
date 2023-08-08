import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './Splash.styles';

export type SplashProps = unknown;

export const SplashScreen: React.FC<SplashProps> = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./dating-icon.jpg')} style={styles.image} />
      <Text style={styles.text}>Dating App</Text>
    </View>
  );
};
