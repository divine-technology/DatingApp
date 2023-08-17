import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import {useMutation} from 'react-query';
import {
  AuthResponseDto,
  AuthUser,
  CreateUserDto,
  LoginUserDto,
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
  const [user, setUser] = useState<AuthUser>();
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
    openApi.instance.auth.authControllerCreateUser({
      requestBody: data,
    }),
  );

  const signOut = () => {
    TOKEN.remove();
    setUser(undefined);
  };

  useEffect(() => {
    if (loginData) {
      TOKEN.set((loginData as AuthResponseDto).token);
      setUser((loginData as AuthResponseDto).user);
      resetSignIn();
    }
  }, [loginData, resetSignIn]);

  useEffect(() => {
    if (signupData) {
      TOKEN.set((signupData as AuthResponseDto).token);
      setUser((signupData as AuthResponseDto).user);

      resetSignUp();
    }
  }, [signupData, resetSignUp]);

  return (
    <AuthContext.Provider value={{loggedIn: !!user, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
