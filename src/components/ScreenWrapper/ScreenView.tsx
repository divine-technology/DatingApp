import React, {PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ScreenViewProps = PropsWithChildren<{
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  safeAreaTop?: boolean;
}>;

export const ScreenView: React.FC<ScreenViewProps> = ({
  children,
  scrollEnabled = false,
  showsVerticalScrollIndicator = false,
  safeAreaTop
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['white', '#fc9c9cC0']}
      locations={[0, 1]}
      style={{
        flex: 1
      }}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={{flex: 1}}
        contentContainerStyle={{
          ...(!scrollEnabled ? {flex: 1} : undefined),
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
          paddingTop: safeAreaTop ? insets.top + 8 : 8
        }}>
        {children}
      </ScrollView>
    </LinearGradient>
  );
};
