import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import { UpdateQuote, DeleteQuote } from '../features/Quote';

const QuotePageMarkup = ({ query: { action }, quote }) => {
  if (!quote) {
    return null;
  }

  const { id, institutionVObj, currencyVObj } = quote;

  return (
    <Layout metadata={{ title: 'Quote' }}>
      <Page>
        {
          action
            ? <UpdateQuote quote={quote}/>
            : (
              <>
                <Link href={`/quote?id=${id}&action=update`} as={`/quotes/${id}/update`}>
                  <a>Update</a>
                </Link>
                &nbsp;|&nbsp;
                <DeleteQuote quote={quote}/>
                <hr/>

                <h1>{`${institutionVObj.name} -- ${currencyVObj.name}`}</h1>
              </>
            )
        }
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

export default _compose(
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
