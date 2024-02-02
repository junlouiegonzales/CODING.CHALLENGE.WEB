import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import package_json from '../package.json';
import middlewares from './common/components/ApolloProviderComponent/middlewares';
import App from './features/app';
import { StyledEngineProvider } from '@mui/material/styles';

const client = new ApolloClient({
  link: middlewares,
  cache: new InMemoryCache(),
  name: 'Coding Challenge',
  version: package_json.version,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
