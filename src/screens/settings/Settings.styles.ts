import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center'
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
  authBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
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
    width: '100%',
    marginVertical: 10,
    gap: 10
  },
  userInfoItem: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff90',
    padding: 16,
    borderRadius: 12,
    borderColor: '#63636330',
    borderWidth: 1
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize'
  },
  galleryContainer: {
    flex: 1,
    width: '100%',
    padding: 8,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff90',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#63636330'
  },
  biocontainer: {
    width: '100%',
    backgroundColor: '#ffffff90',
    borderRadius: 12,
    borderColor: '#63636330',
    borderWidth: 1
  },
  bioTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize'
  },
  bioSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingBottom: 8,
    paddingHorizontal: 8
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  }
});
