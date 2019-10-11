// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch');

const GQL_ALL_PARSER = `
  query AllParser {
    allParser {
      id
      institution {
        refId
        refSlug
      }
      url
      period
      processedAt
      quotes {
        amount
        currency {
          refId
          refSlug
        }
        xPaths {
          bid
          ask
          code
        }
      }
    }
  }
`;

const getParser = async () => {
  try {
    const response = await fetch('http://backend:3010/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': `Bearer ${process.env.JWT_SECRET_ADMIN}`,
        'x-api-key': `${process.env.JWT_SECRET_SERVER}`,
      },
      body: JSON.stringify({
        query: GQL_ALL_PARSER,
      }),
    });

    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      return Promise.reject(error);
    }

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return undefined;
};

module.exports = getParser;
