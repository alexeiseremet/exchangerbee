import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { multiClientMiddleware } from 'redux-axios-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'

import rootReducer from 'Root/rootReducer'
import { apiBaseUrl } from 'Root/server.config'

const initStore = (initialState = {}) => (
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        multiClientMiddleware(apiClients, apiClientsOptions),
        thunkMiddleware,
      )
    )
  )
)

class ExbeeApp extends App {
  static async getInitialProps ({Component, ctx}) {
    // await ctx.store.dispatch(loadCategories())

    return {
      pageProps: (
        Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      )
    }
  }

  render () {
    const {Component, pageProps, store} = this.props

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps}/>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(ExbeeApp)
