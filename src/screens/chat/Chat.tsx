import React from 'react';
import {View, Text} from 'react-native';
import {MessagesStackScreenProps} from '../../navigation/MessagesRoutes';

export type ChatScreenProps = {likeId: string};

export const ChatScreen: React.FC<MessagesStackScreenProps<'Chat'>> = ({
  route
}) => {
  const {likeId} = route.params;
  console.log('LIKE ID: ', likeId);
  return <Text style={{color: 'black', fontSize: 40}}>CHAT</Text>;
};
