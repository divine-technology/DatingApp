import React from 'react';
import * as Icons from 'react-native-heroicons/solid';
import {styles} from './TopBar.styles';
import {TopTabProps} from '../../navigation/AppRoutes';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const TopBar: React.FC<TopTabProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const style = styles(insets.top);

  const activeIndex = navigation.getState().index;

  return (
    <View style={style.headerContainer}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2
        }}>
        <Icons.ChatBubbleOvalLeftEllipsisIcon
          size={50}
          color={activeIndex === 0 ? '#b13ef7' : 'gray'}
          onPress={() => navigation.navigate('Messages')}
        />
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2
        }}>
        <Icons.HomeIcon
          size={50}
          color={activeIndex === 1 ? '#b13ef7' : 'gray'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2
        }}>
        <Icons.UserCircleIcon
          size={50}
          color={activeIndex === 2 ? '#b13ef7' : 'gray'}
          onPress={() =>
            navigation.navigate('SettingsStack', {screen: 'Settings'})
          }
        />
      </View>
    </View>
  );
};
