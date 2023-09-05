import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  wrapper: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
      }
    })
  }
});
