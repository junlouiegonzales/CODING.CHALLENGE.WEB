import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../../AuthManagerProvider/api/types';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    document.cookie &&
    document.cookie
      .split('; ')
      .find((row) => row.startsWith(AUTH_TOKEN))
      ?.split('=')[1];

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default authLink;
