import { onError } from '@apollo/client/link/error';
import toast from 'react-hot-toast';

export enum ExceptionCode {
  GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
}

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error): void => {
      switch (error.extensions?.code) {
        case ExceptionCode.GRAPHQL_VALIDATION_FAILED:
          toast.error(`Required Fields: ${error.message}`);
          break;
        case ExceptionCode.INTERNAL_SERVER_ERROR:
          toast.error(error.message);
          break;
        case ExceptionCode.BAD_USER_INPUT:
          toast.error(`Error: ${error.message}`);
          break;
        default:
          break;
      }
    });
  }
  if (networkError) console.error(`Network error: ${networkError}`);
});

export default errorLink;
