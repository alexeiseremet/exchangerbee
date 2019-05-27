// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch')

const GQL_CREATE_QUOTE = `
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      institution { id }
      currency { id }
      date
      amount
      ask
      bid
      period
      error
    }
  }
`

const GQL_UDATE_QUOTE = `
  mutation CreateQuote ($id: ID!, $quote: QuoteInput!) {
    updateQuote(id: $id, quote: $quote) {
      institution
      currency
      updatedAt
    }
  }
`

const updateQuotes = (quotes) => {
  for (let quote of quotes) {
    fetch('http://backend:3010/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        GQL_CREATE_QUOTE,
        variables: {
          quote
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          let error = new Error(response.statusText)
          error.response = response
          return Promise.reject(error)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

module.exports = updateQuotes
