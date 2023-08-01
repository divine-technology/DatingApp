import React, {PropsWithChildren, createContext} from 'react';
import {useQuery} from '../../services/useQuery';
import {EndpointEnum} from '../../services/endpoints';

export type AuthContextProps = {
  loggedIn?: boolean;
  isLoading?: boolean;
  user?: object;
  signIn?: () => Promise<void>;
  signOut?: () => Promise<void>;
  signUp?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {data, isLoading} = useQuery(EndpointEnum.getMe);

  return (
    <AuthContext.Provider value={{loggedIn: !!data, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
