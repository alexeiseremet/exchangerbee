// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const fetch = require('isomorphic-unfetch');
const { moment } = require('../lib/moment');

const GQL_UPDATE_PARSER = `
  mutation UpdateParser ($id: ID!, $parser: ParserInput!) {
    updateParser(id: $id, parser: $parser) {
      id
    }
  }
`;

const updateParser = async (id) => {
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
        query: GQL_UPDATE_PARSER,
        variables: {
          id,
          parser: {
            processedAt: String(moment()),
          },
        },
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

module.exports = updateParser;
