import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrenciesArr, baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BestQuotes from '../features/BestQuotes';

const IndexPageMarkup = ({
  post, centralQuote, bestBidQuote, bestAskQuote,
}) => {
  if (!post) {
    return null;
  }

  return (
    <Layout metadata={{
      title: `Curs valutar — ${baseCountry.name}`,
      description: `Cel mai bun curs (${String(baseCountry.slug).toUpperCase()}) oferit de bănci şi casele de schimb.`,
    }}>
      <Page heading={`(${String(baseCountry.slug).toUpperCase()}) Curs valutar`}>
        <BestQuotes
          bestAskQuote={bestAskQuote}
          bestBidQuote={bestBidQuote}
          centralQuote={centralQuote}
        />

        {
          post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
          )
        }

        {
          post.textSecond && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textSecond }}
            />
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
  query IndexPage ($postSlug: String, $date: String, $currencies: [String!], $excludeBanks: [String!], $includeBanks: [String!]) {
    centralQuote: bestTodayQuote (date: $date, currencies: $currencies, includeBanks: $includeBanks) {
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
    bestBidQuote: bestTodayQuote (date: $date, currencies: $currencies, excludeBanks: $excludeBanks) {
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
    bestAskQuote: bestTodayQuote (date: $date, currencies: $currencies, excludeBanks: $excludeBanks, type: "ask") {
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
          date: today(),
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
