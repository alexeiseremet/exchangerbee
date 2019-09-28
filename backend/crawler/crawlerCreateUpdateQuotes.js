// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch');
const { today } = require('../lib/moment');

const GQL_UDATE_QUOTE = `
  mutation UpdateQuote ($where: QuoteWhereInput!, $quote: QuoteInput!) {
    updateQuote(where: $where, quote: $quote) {
      id
    }
  }
`;

const createUpdateQuotes = (quotes) => {
  quotes.forEach(async (quote) => {
    // Get current day and set hours at midnight.
    const todayValue = today();

    // whereQuote will be used for search in db.
    // If quote exist, update it, if not - create new.
    let { code, bid, ask } = quote;
    const { institution, currency } = quote;
    const whereQuote = { institution, currency, date: todayValue };

    code = code.trim();
    bid = bid.trim();
    ask = ask.trim();

    if (!parseFloat(bid) || !parseFloat(ask) || +bid <= 0 || +ask <= 0) {
      return undefined;
    }

    // Verify if parsed currency code is the same as refSlug (ex. usd !== usd).
    const quoteHasError = code === currency.refSlug ? 'no' : 'yes';

    // Create cleaned Quote object.
    const cleanedQuote = { ...quote, bid, ask };
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
              date: String(todayValue),
              error: quoteHasError,
            },
          },
        }),
      });

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return undefined;
  });
};

module.exports = createUpdateQuotes;
