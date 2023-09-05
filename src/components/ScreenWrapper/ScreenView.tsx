import React, {
  PropsWithChildren
  // , useEffect
} from 'react';
// import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ScreenView: React.FC<PropsWithChildren> = ({children}) => {
  const insets = useSafeAreaInsets();

  // const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', e => {
  //     console.log('back', {e});
  //     e.preventDefault();
  //     navigation.navigate('LikeRequests');
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <LinearGradient
      colors={['white', '#b13ef790']}
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
