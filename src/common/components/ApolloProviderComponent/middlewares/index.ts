import errorLink from './errorLink';
import authLink from './authLink';
import httpLink from './httpLink';

import { from } from '@apollo/client';

export default from([errorLink, authLink, httpLink]);
