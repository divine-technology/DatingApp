import React from 'react';
import * as Icons from 'react-native-heroicons/solid';
import {styles} from './TopBar.styles';
import {TopTabProps} from '../../navigation/AppRoutes';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const TopBar: React.FC<TopTabProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const style = styles(insets.top);
  return (
    <View style={style.headerContainer}>
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
    </View>
  );
};
