import React from 'react';
import {View, Text} from 'react-native';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';

export const LikeRequestsScreen: React.FC = () => {
  return (
    <ScreenView>
      <Text style={{fontSize: 60, color: 'black'}}>LIKE REQUESTS</Text>
    </ScreenView>
  );
};
