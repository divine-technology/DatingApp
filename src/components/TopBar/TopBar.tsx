import React from 'react';
import * as Icons from 'react-native-heroicons/solid';
import {styles} from './TopBar.styles';
import {TopTabProps} from '../../navigation/AppRoutes';
import {SafeAreaView} from 'react-native-safe-area-context';

export const TopBar: React.FC<TopTabProps> = ({navigation}) => {
  const style = styles();
  return (
    <SafeAreaView style={style.headerContainer}>
      <Icons.ChatBubbleOvalLeftEllipsisIcon
        size={50}
        color="orange"
        onPress={() => navigation.navigate('Messages')}
      />
      <Icons.HomeIcon
        size={50}
        color="orange"
        onPress={() => navigation.navigate('Home')}
      />
      <Icons.UserCircleIcon
        size={50}
        color="orange"
        onPress={() =>
          navigation.navigate('SettingsStack', {screen: 'Settings'})
        }
      />
    </SafeAreaView>
  );
};
