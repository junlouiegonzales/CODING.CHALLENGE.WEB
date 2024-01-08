export const AUTH_TOKEN = 'APOLLO_GRAPHQL_AuthToken';

export interface GetUserModel {
  getUser?: UserModel;
}

export interface UserModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  middleNam?: string;
  fullName?: string;
  email?: string;
  roles?: string;
  photo?: string;
}

export interface PayloadModel {
  userId?: string;
}

export type AuthManagerContextModel = {
  isUserSignedIn?: boolean;
  userId?: string;
  user?: UserModel;
  loadUser?: boolean;
  removeAuthToken?: () => void;
  setAuthToken?: (authToken: string, expiration: Date) => void;
};
