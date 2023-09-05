import React, {PropsWithChildren} from 'react';
import {View, Text} from 'react-native';
import {styles} from './InfoContainer.styles';

type InfoContainer = PropsWithChildren<{
  title?: string;
  subTitle?: string;
}>;

export const InfoContainer: React.FC<InfoContainer> = ({
  title,
  subTitle,
  children
}) => {
  return (
    <View style={styles.wrapper}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      {children}
    </View>
  );
};
