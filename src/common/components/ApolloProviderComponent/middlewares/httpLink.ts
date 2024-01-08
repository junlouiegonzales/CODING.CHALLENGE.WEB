import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_SERVER_URL,
  credentials: 'same-origin',
});

export default httpLink;
