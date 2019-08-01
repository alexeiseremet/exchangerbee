// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch');

const GQL_UDATE_QUOTE = `
  mutation UpdateQuote ($where: QuoteWhereInput!, $quote: QuoteInput!) {
    updateQuote(where: $where, quote: $quote) {
      id
    }
  }
`;

const createUpdateQuotes = async (quotes) => {
  for (let quote of quotes) {
    // Get current day and set hours at midnight.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // whereQuote will be used for search in db.
    // If quote exist, update it, if not - create new.
    const { institution, currency, code } = quote;
    const whereQuote = { institution, currency, date: today };

    // Verify if parsed currency code is the same as refSlug (ex. usd !== usd).
    const quoteHasError = code === currency.refSlug ? 'no' : 'yes';

    // Remove property that contains the parsed value,
    // we do not save in DB as refSlug.
    let cleanedQuote = { ...quote };
    delete cleanedQuote.code;

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
              date: String(today),
              error: quoteHasError,
            }
          }
        })
      });

      if (!response.ok) {
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error)
      }
    }
    catch (error) {
      console.error(error)
    }
  }
};

module.exports = createUpdateQuotes;
