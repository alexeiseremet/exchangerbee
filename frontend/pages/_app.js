// Import temporary.
import '../assets/scss/helper.scss';
import '../assets/scss/tables.scss';
import '../assets/scss/typography.scss';

import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/apollo/with-apollo-client';
import { appWithTranslation } from '../lib/i18n';

class ExbeeApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(appWithTranslation(ExbeeApp));
