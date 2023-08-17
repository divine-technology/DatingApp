import React, {PropsWithChildren, createContext, useState} from 'react';
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
  const {mutate: signIn} = useMutation<unknown, unknown, LoginUserDto>(
    'login',
    data =>
      openApi.instance.auth.authControllerLoginUser({
        requestBody: data,
      }),
    {
      onSuccess: data => {
        TOKEN.set((data as AuthResponseDto).token);
        setUser((data as AuthResponseDto).user);
      },
      onError: () => {},
    },
  );

  const {mutate: signUp} = useMutation<unknown, unknown, CreateUserDto>(
    'signup',
    data =>
      openApi.instance.auth.authControllerCreateUser({
        requestBody: data,
      }),
    {
      onSuccess: data => {
        TOKEN.set((data as AuthResponseDto).token);
        setUser((data as AuthResponseDto).user);
      },
      onError: () => {},
    },
  );

  const signOut = () => {
    TOKEN.remove();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{loggedIn: !!user, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
