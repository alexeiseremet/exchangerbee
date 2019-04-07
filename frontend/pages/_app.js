import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApolloClient from '../lib/apollo/with-apollo-client'

class ExbeeApp extends App {
  render () {
    const {Component, pageProps, apolloClient} = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps}/>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(ExbeeApp)
