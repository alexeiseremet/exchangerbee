// Import temporary.
import '../assets/scss/helper.scss';
import '../assets/scss/tables.scss';
import '../assets/scss/typography.scss';

import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/apollo/with-apollo-client';
import { appWithTranslation } from '../lib/i18n';

class XezoomApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApolloClient(appWithTranslation(XezoomApp));
