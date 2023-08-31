import React, {PropsWithChildren} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ScreenView: React.FC<PropsWithChildren> = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['white', '#b13ef760']}
      locations={[0.1, 1]}
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
        paddingTop: 8
      }}>
      {children}
    </LinearGradient>
  );
};
