import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  reactButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#FFFFFF70'
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: {width: 0, height: 2},
    //     shadowOpacity: 0.5,
    //     shadowRadius: 2,
    //     elevation: 2
    //   },
    //   android: {
    //     backgroundColor: '#FFFFFF70'
    //   }
    // })
  }
});
