import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2
  },
  image: {
    width: '100%',
    height: '100%'
  },
  absWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  absWrapper2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    height: 200
  },
  likeDislikeWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 64
  },
  likeDislike: {
    flex: 1
  },
  infoWrapper: {
    padding: 12,
    height: '100%',
    gap: 4
    // backgroundColor: '#FFFFFF80',
  },
  info: {
    fontSize: 24,
    color: 'black'
  },
  bio: {
    fontSize: 14,
    color: 'black'
  }
});
