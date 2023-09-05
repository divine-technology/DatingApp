import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#FFF'
  },
  footerContainer: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingBottom: 40
  },
  subTextWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  image: {
    borderColor: 'black',
    borderWidth: 1,
    width: (Dimensions.get('screen').width - 50) / 3,
    height: (Dimensions.get('screen').width - 50) / 3
  }
});
