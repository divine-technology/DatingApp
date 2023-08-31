import React from 'react';
import {View, Text} from 'react-native';

type MessageProps = undefined;

export const Message: React.FC<MessageProps> = () => {
  return (
    <View>
      <Text>neka poruka</Text>
    </View>
  );
};
