import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrenciesArr, baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BestQuotes from '../features/BestQuotes';

const IndexPageMarkup = ({
  centralQuote, bestBidQuote, bestAskQuote, post,
}) => {
  if (!post) {
    return null;
  }

  return (
    <Layout metadata={{
      title: 'Curs valutar',
      description: `Cel mai bun curs (${String(baseCountry.slug).toUpperCase()}) oferit de bănci şi casele de schimb.`,
    }}>
      <Page>
        <div className="page-heading">
          <h1>{post.title}</h1>
        </div>

        {
          post.textFirst && (
            <p dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
          )
        }

        <BestQuotes
          bestAskQuote={bestAskQuote}
          bestBidQuote={bestBidQuote}
          centralQuote={centralQuote}
        />

        {
          post.textSecond && (
            <p style={{ marginTop: '3rem' }} dangerouslySetInnerHTML={{ __html: post.textSecond }} />
          )
        }
      </Page>
    </Layout>
  );
};

// getInitialProps.
IndexPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}` : asPath;

  return {
    namespacesRequired: ['common'],
    fullPath,
  };
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
      props: ({
        data: {
          post, centralQuote, bestBidQuote, bestAskQuote,
        },
      }) => ({
        post,
        centralQuote,
        bestBidQuote,
        bestAskQuote,
      }),
    },
  ),
)(IndexPageI18N);
