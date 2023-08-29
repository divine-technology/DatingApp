import React, {PropsWithChildren} from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const ScreenView: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <LinearGradient
      colors={['white', '#b13ef760']}
      locations={[0.1, 1]}
      style={{flex: 1}}>
      {children}
    </LinearGradient>
  );
};
