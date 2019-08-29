import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { today } from '../lib/moment';

const IndexPageMarkup = ({ post, bestTodayQuote }) => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />

    <Page>
      {post && (
        <React.Fragment>
          <h1 style={{ marginBottom: '10px', fontSize: '18px' }}>
            {post.title}
          </h1>

          <p dangerouslySetInnerHTML={{ __html: post.textFirst }}/>

          <p dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
        </React.Fragment>
      )}

      <div>
        USD
        Buy 17.77 Moldova Agroindbank
        Sell 17.94 Moldova Agroindbank
        BNM 17.9361
      </div>
    </Page>
  </Layout>

);

// getInitialProps.
IndexPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}` : asPath;

  return {
    namespacesRequired: ['common'],
    fullPath,
  }
};

// i18n.
const IndexPageI18N = withTranslation('common')(IndexPageMarkup);

// Container.
const GQL_INDEX_PAGE = gql`
  query IndexPage ($currencies: [String!]!, $postSlug: String!, $centralBankSlug: String!) {
    bestTodayQuote (currencies: $currencies, centralBankSlug: $centralBankSlug) {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
      }
      amount
      bid
      ask
    }
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_INDEX_PAGE,
    {
      options: ({ fullPath }) => ({
        variables: {
          currencies: ['usd', 'eur'],
          centralBankSlug: 'bnm',
          postSlug: fullPath,
        },
      }),
      props: ({ data: { post, bestTodayQuote } }) => ({
        post,
        bestTodayQuote,
      }),
    }
  )
)(IndexPageI18N)
