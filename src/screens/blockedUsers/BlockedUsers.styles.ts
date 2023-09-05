import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  upperContainer: {
    marginBottom: 18
  },
  h2TextStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    marginBottom: 18
  },
  imageStyle: {
    height: 70,
    width: 70,
    borderRadius: 75
  },
  textMessageContainter: {
    flexDirection: 'column',
    padding: 12,
    justifyContent: 'center',
    flex: 1
  },
  userNameText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500'
  },
  messageText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
    flex: 1
  },
  dateText: {
    fontSize: 12,
    color: '#00000060',
    fontWeight: '400',
    marginLeft: 6
  }
});
