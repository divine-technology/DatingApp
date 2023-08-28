import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden'
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
  likeDislikeWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 64
  },
  likeDislike: {
    flex: 1
  },
  infoWrapper: {
    padding: 8,
    backgroundColor: '#FFFFFF80',
    minHeight: 120
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
