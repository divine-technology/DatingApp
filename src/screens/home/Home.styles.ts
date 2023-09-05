import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  reactButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#FFFFFF70',
    ...Platform.select({
      ios: {
        zIndex: -10
      }
    })
  }
});
