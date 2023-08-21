import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View} from 'react-native';
import * as Icons from 'react-native-heroicons/solid';
import {styles} from './TopBar.styles';

export const TopBar: React.FC<MaterialTopTabBarProps> = ({navigation}) => {
  const style = styles();
  return (
    <View style={style.headerContainer}>
      <Icons.ChatBubbleOvalLeftEllipsisIcon size={50} color="orange" />
      <Icons.HomeIcon
        size={50}
        color="orange"
        onPress={() => navigation.navigate('Home')}
      />
      <Icons.UserCircleIcon
        size={50}
        color="orange"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};
