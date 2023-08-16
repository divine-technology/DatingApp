// use this https://github.com/oblador/react-native-keychain if security is important
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CallbackWithResult} from '@react-native-async-storage/async-storage/lib/typescript/types';

class Token {
  public key: string;

  public get = async (
    callback?: CallbackWithResult<string>,
  ): Promise<string | undefined> => {
    const token = await AsyncStorage.getItem(this.key, callback);
    if (token) {
      return token;
    }
    return undefined;
  };

  public set = (token: string, callback?: CallbackWithResult<string>) => {
    AsyncStorage.setItem(this.key, token, callback);
  };

  public remove = (callback?: CallbackWithResult<string>) => {
    AsyncStorage.removeItem(this.key, callback);
  };

  constructor() {
    this.key = 'token';
  }
}

const TOKEN = new Token();
export {TOKEN};
