import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { UpdateQuote, DeleteQuote } from '../../features/Quote';

const QuotePageMarkup = ({ quote }) => {
  if (!quote) {
    return null;
  }

  return (
    <Layout metadata={{ title: quote.institutionVObj.name }} type="admin">
      <Page>
        <DeleteQuote quote={quote}/>
        <hr/>
        <UpdateQuote quote={quote}/>
      </Page>
    </Layout>
  );
};

// getInitialProps.
QuotePageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const QuotePageI18N = withTranslation('common')(QuotePageMarkup);

// Container.
const GQL_QUOTE = gql`
  query Quote ($id: ID!) {
    quote(id: $id) {
      id
      institution {
        refId
        refSlug
      }
      institutionVObj {
        name
      }
      currency {
        refId
        refSlug
      }
      currencyVObj {
        name
      }
      date
      amount
      bid
      ask
      period
      error
    }
  }
`;

const QuotePageGQL = _compose(
  graphql(
    GQL_QUOTE,
    {
      options: ({ query }) => ({
        variables: {
          id: query.id,
        },
      }),
      props: ({ data: { quote } }) => ({
        quote,
      }),
    },
  ),
)(QuotePageI18N);

export default securePage(QuotePageGQL);
