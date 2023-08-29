import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: '100%',
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40
  },
  registerHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 20
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: 'white'
  },
  forgot: {
    color: 'white',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'white'
  }
});
