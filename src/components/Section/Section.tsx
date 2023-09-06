import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

type SectionProps = PropsWithChildren<{
  color: string;
}>;

export const Section: React.FC<SectionProps> = ({
  children,
  color = 'black'
}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8}}>
      <View style={{flex: 1, height: 1, backgroundColor: color}} />
      {children}
      <View style={{flex: 1, height: 1, backgroundColor: color}} />
    </View>
  );
};
