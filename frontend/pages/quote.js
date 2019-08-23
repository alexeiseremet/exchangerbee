import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdateQuote, DeleteQuote } from '../features/Quote'

const QuotePageMarkup = ({ query: { action }, quote }) => {
  if (!quote) {
    return null
  }

  const { id, institutionVObj, currencyVObj } = quote;

  return (
    <Layout>
      <Metadata
        title={t.metaTitle}
        description={t.metaDescription}
        ogTitle={t.ogTitle}
        ogDescription={t.ogDescription}
      />
      <Page>
        {
          !action && (
            <React.Fragment>
              <Link href={`/quote?id=${id}&action=update`} as={`/quotes/${id}/update`}>
                <a>{'Update'}</a>
              </Link>
              &nbsp;|&nbsp;
              <DeleteQuote quote={quote} />
              <hr />

              <h1>{institutionVObj.name} -- {currencyVObj.name}</h1>
            </React.Fragment>
          )
        }

        {action && <UpdateQuote quote={quote} />}
      </Page>
    </Layout>
  )
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
        quote
      }),
    }
  )
)(QuotePageI18N)
