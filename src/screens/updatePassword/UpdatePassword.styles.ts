import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'black'
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    gap: 8
  },
  userBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5
  },
  userBtnTxt: {
    color: '#2e64e5'
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20
  },
  userInfoItem: {
    justifyContent: 'center'
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black'
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  selectWrapper: {
    width: '100%',
    height: 44,
    backgroundColor: '#fb5b5a',
    borderRadius: 24,
    paddingHorizontal: 8,
    marginBottom: 10,
    flexDirection: 'row'
  },
  iconStyle: {
    flex: 1,
    width: 28,
    height: 28,
    alignSelf: 'flex-start',
    marginVertical: 4
  }
});
