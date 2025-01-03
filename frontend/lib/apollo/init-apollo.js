import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

import { apiBaseUrl } from '../../server.config';
import { typeDefs, resolvers, defaultState } from '../../localSchema';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, lng) {
  const cache = new InMemoryCache().restore(initialState || {});

  cache.writeData({
    data: defaultState,
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `${apiBaseUrl}/?lng=${lng}`, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache,
    resolvers,
    typeDefs,
  });
}

export default function initApollo(initialState, lng) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, lng);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, lng);
  }

  return apolloClient;
}
