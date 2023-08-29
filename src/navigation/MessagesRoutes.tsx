import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {MessagesScreen} from '../screens/messages/Messages';
import {LikeRequestsScreen} from '../screens/likeRequests/LikeRequests';

export type MessagesStackParamList = {
  LikeRequests: undefined;
  Messages: undefined;
};

export type MessagesStackNavigatorProps =
  StackScreenProps<MessagesStackParamList>;

export type MessagesStackScreenProps<T extends keyof MessagesStackParamList> =
  StackScreenProps<MessagesStackParamList, T>;

const MessagesStack = createStackNavigator<MessagesStackParamList>();

export const MessagesRoutes: React.FC = () => {
  return (
    <MessagesStack.Navigator screenOptions={{headerShown: false}}>
      <MessagesStack.Screen name="Messages" component={MessagesScreen} />
      <MessagesStack.Screen
        name="LikeRequests"
        component={LikeRequestsScreen}
      />
    </MessagesStack.Navigator>
  );
};
