import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import { centralBank, baseCurrenciesArr } from '../server.config'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import BestQuotes from '../features/BestQuotes'

const IndexPageMarkup = ({ post, centralQuote, bestBidQuote, bestAskQuote }) => (
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
        </React.Fragment>
      )}

      <BestQuotes bestAskQuote={bestAskQuote}
                  bestBidQuote={bestBidQuote}
                  centralQuote={centralQuote}
      />

      {
        post && post.textSecond && (
          <p style={{ marginTop: '3rem' }} dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
        )
      }
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
  query IndexPage ($currencies: [String!]!, $postSlug: String! $excludeBanks: [String!], $includeBanks: [String!]) {
    centralQuote: bestTodayQuote (currencies: $currencies, includeBanks: $includeBanks) {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
        numCode
      }
      amount
      bid
      ask
    }
    bestBidQuote: bestTodayQuote (currencies: $currencies, excludeBanks: $excludeBanks) {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
        numCode
      }
      amount
      bid
      ask
    }
    bestAskQuote: bestTodayQuote (currencies: $currencies, excludeBanks: $excludeBanks, type: "ask") {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
        numCode
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
          postSlug: fullPath,
          currencies: baseCurrenciesArr,
          excludeBanks: [centralBank.slug],
          includeBanks: [centralBank.slug],
        },
      }),
      props: ({ data: { post, centralQuote, bestBidQuote, bestAskQuote } }) => ({
        post,
        centralQuote,
        bestBidQuote,
        bestAskQuote,
      }),
    }
  )
)(IndexPageI18N)
