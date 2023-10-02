import React, {PropsWithChildren} from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './InfoContainer.styles';
import * as Icons from 'react-native-heroicons/outline';
import {themeColors} from '../../themes/colors';

type InfoContainer = PropsWithChildren<{
  title?: string;
  subTitle?: string;
  endAdornment?: React.ReactElement;
  onPress?: () => void;
}>;

export const InfoContainer: React.FC<InfoContainer> = ({
  title,
  subTitle,
  endAdornment,
  onPress,
  children
}) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <View style={{flex: 1}}>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        {endAdornment && (
          <Pressable style={{position: 'absolute', right: 0}} onPress={onPress}>
            {endAdornment}
          </Pressable>
        )}
      </View>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      {children}
    </View>
  );
};
