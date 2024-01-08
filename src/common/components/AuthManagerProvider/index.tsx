/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FunctionComponent,
  createContext,
  useEffect,
  useState,
} from 'react';
import { DefaultProps } from '../../types';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router';
import { CookieSetOptions } from 'universal-cookie';
import {
  AuthManagerContextModel,
  GetUserModel,
  AUTH_TOKEN,
  PayloadModel,
} from './api/types';
import { GET_USER } from './api/graphql';
import { useQuery } from '@apollo/client';

const defaultContextValue: AuthManagerContextModel = {
  isUserSignedIn: false,
};

export const AuthManagerContext = createContext(defaultContextValue);
export interface AuthManagerProviderProps extends DefaultProps {}

const AuthManagerProvider: FunctionComponent<AuthManagerProviderProps> = (
  props: AuthManagerProviderProps
) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_TOKEN]);
  const [loadPayload, setLoadPayload] = useState<boolean>(true);
  const [payload, setPayload] = useState<PayloadModel>({
    userId: undefined,
  });

  const setAuthToken = (authToken: string, exp: Date): void => {
    const options: CookieSetOptions = {
      path: '/',
      expires: new Date(exp),
    };
    setCookie(AUTH_TOKEN, authToken, options);
    setLoadPayload(true);
  };

  const removeAuthToken = (): void => {
    setPayload({ userId: undefined });
    removeCookie(AUTH_TOKEN, { path: '/' });
  };

  const { loading: loadUser, data: currentUser } = useQuery<GetUserModel>(
    GET_USER,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: payload.userId,
      },
    }
  );

  const { children } = props;
  const loginToken = cookies[AUTH_TOKEN];
  const isUserSignedIn = cookies && loginToken;

  useEffect((): void => {
    if (isUserSignedIn && loadPayload) {
      jwt.verify(
        loginToken,
        process.env.REACT_APP_SECRET_KEY as string,
        (error: any, data: any): any => {
          if (error) navigate('/');
          if (!error && data) setPayload(data);
          setLoadPayload(false);
        }
      );
    }
  }, [loginToken, isUserSignedIn, navigate, payload, loadPayload]);

  const user = {
    ...currentUser?.getUser,
    isCurrentUser: (userId: string): boolean => {
      return currentUser?.getUser?.id === userId;
    },
  };

  return (
    <AuthManagerContext.Provider
      value={{
        isUserSignedIn,
        removeAuthToken,
        setAuthToken,
        loadUser,
        user,
        userId: payload.userId,
      }}
    >
      {children}
    </AuthManagerContext.Provider>
  );
};

export default AuthManagerProvider;
