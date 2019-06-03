// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch')

const GQL_CREATE_QUOTE = `
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      id
    }
  }
`

const GQL_UDATE_QUOTE = `
  mutation UpdateQuote ($id: ID!, $quote: QuoteInput!) {
    updateQuote(id: $id, quote: $quote) {
      id
    }
  }
`

const createUpdateQuotes = async (quotes) => {
  for (let quote of quotes) {
    let cleanedQuote = {...quote}
    delete cleanedQuote.code

    const hasError = quote.code !== quote.currency.refSlug
    const date = new Date()
    date.setHours(0,0,0,0)

    try {
      const response = await fetch('http://backend:3010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: GQL_CREATE_QUOTE,
          variables: {
            quote: {
              ...cleanedQuote,
              date: String(date),
              error: String(hasError),
            }
          }
        })
      })

      if (!response.ok) {
        let error = new Error(response.statusText)
        error.response = response
        return Promise.reject(error)
      }

      // return await response.json()
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = createUpdateQuotes
