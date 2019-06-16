// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch')

const GQL_UDATE_QUOTE = `
  mutation UpdateQuote ($where: QuoteWhereInput!, $quote: QuoteInput!) {
    updateQuote(where: $where, quote: $quote) {
      id
    }
  }
`

const createUpdateQuotes = async (quotes) => {
  for (let quote of quotes) {
    let cleanedQuote = {...quote}
    delete cleanedQuote.code

    // whereQuote will be used for search in db.
    // If quote exist, update it, if not - create new.
    const {institution, date, currency} = quote
    const whereQuote = {institution, currency, date}

    // Verify if parsed currency code is the same as refSlug (ex. usd !== usd).
    const quoteHasError = quote.code !== quote.currency.refSlug
    // Get current day and set hours at midnight.
    const newDate = new Date()
    newDate.setHours(0,0,0,0)

    try {
      const response = await fetch('http://backend:3010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: GQL_UDATE_QUOTE,
          variables: {
            where: whereQuote,
            quote: {
              ...cleanedQuote,
              date: String(newDate),
              error: String(quoteHasError),
            }
          }
        })
      })

      if (!response.ok) {
        let error = new Error(response.statusText)
        error.response = response
        return Promise.reject(error)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = createUpdateQuotes
