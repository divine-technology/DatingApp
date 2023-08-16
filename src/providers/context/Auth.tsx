import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import {useMutation} from 'react-query';
import {
  CreateUserDto,
  LoginResponseDto,
  LoginUserDto,
  User,
} from '../../apiClient';
import {openApi} from '../../services/openApi';
import {TOKEN} from '../../services/token';

export type AuthContextProps = {
  loggedIn?: boolean;
  isLoading?: boolean;
  user?: object;
  signIn: (data: LoginUserDto) => void;
  signOut: () => void;
  signUp: (data: CreateUserDto) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<User>();
  const {
    data: loginData,
    mutate: signIn,
    reset: resetSignIn,
  } = useMutation<unknown, unknown, LoginUserDto>('login', data =>
    openApi.instance.auth.authControllerLoginUser({
      requestBody: data,
    }),
  );

  const {
    data: signupData,
    mutate: signUp,
    reset: resetSignUp,
  } = useMutation<unknown, unknown, CreateUserDto>('signup', data =>
    openApi.instance.user.usersControllerCreateUser({
      requestBody: data,
    }),
  );

  const signOut = () => {
    TOKEN.remove();
    setUser(undefined);
  };

  useEffect(() => {
    if (loginData) {
      TOKEN.set((loginData as LoginResponseDto).token);
      setUser({
        email: 'tarik@mail.com',
        password: '',
        name: 'Tarik',
        role: 'test',
        forgotPasswordTimestamp: '',
        forgotPasswordToken: '',
        createdAccountTimestamp: '',
        location: {type: 'test', coordinates: [1, 2]},
      });
      resetSignIn();
    }
  }, [loginData, resetSignIn]);

  useEffect(() => {
    if (signupData) {
      TOKEN.set((signupData as LoginResponseDto).token);
      setUser({
        email: 'tarik@mail.com',
        password: '',
        name: 'Tarik',
        role: 'test',
        forgotPasswordTimestamp: '',
        forgotPasswordToken: '',
        createdAccountTimestamp: '',
        location: {type: 'test', coordinates: [1, 2]},
      });
      resetSignUp();
    }
  }, [signupData, resetSignUp]);

  return (
    <AuthContext.Provider value={{loggedIn: !!user, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
