import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {MessagesScreen} from '../screens/messages/Messages';
import {LikeRequestsScreen} from '../screens/likeRequests/LikeRequests';
import {ChatScreen, ChatScreenProps} from '../screens/chat/Chat';
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import {RootStackScreenProps} from './Routes';
import {
  ChatRequestScreen,
  ChatRequestScreenProps
} from '../screens/chat/ChatRequest';

export type MessagesStackParamList = {
  LikeRequests: undefined;
  Messages: undefined;
  Chat: ChatScreenProps;
  ChatRequests: ChatRequestScreenProps;
};

export type MessagesStackNavigatorProps =
  StackScreenProps<MessagesStackParamList>;

export type MessagesStackScreenProps<T extends keyof MessagesStackParamList> =
  StackScreenProps<MessagesStackParamList, T>;

export type MessagesNavigatorParams =
  NavigatorScreenParams<MessagesStackParamList>;

export type MessagesStackCompositeScreenProps<
  T extends keyof MessagesStackParamList
> = CompositeScreenProps<
  MessagesStackScreenProps<T>,
  RootStackScreenProps<'App'>
>;

const MessagesStack = createStackNavigator<MessagesStackParamList>();

export const MessagesRoutes: React.FC = () => {
  return (
    <MessagesStack.Navigator screenOptions={{headerShown: false}}>
      <MessagesStack.Screen name="Messages" component={MessagesScreen} />
      <MessagesStack.Screen
        name="LikeRequests"
        component={LikeRequestsScreen}
      />
      <MessagesStack.Screen name="Chat" component={ChatScreen} />
      <MessagesStack.Screen name="ChatRequests" component={ChatRequestScreen} />
    </MessagesStack.Navigator>
  );
};
