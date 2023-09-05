import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  h2TextStyle: {
    fontSize: 20,
    color: 'black',
    flex: 1,
    fontWeight: '700'
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
