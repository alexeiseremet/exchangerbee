import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrenciesArr } from '../../server.config';
import { withTranslation } from '../../lib/i18n';
import { today } from '../../lib/moment';

import BestQuotes from '../../features/BestQuotes';

const WidgetTopPageMarkup = ({
  centralQuote, bestBidQuote, bestAskQuote,
}) => (
  <div className="widget-top">
    <BestQuotes
      bestAskQuote={bestAskQuote}
      bestBidQuote={bestBidQuote}
      centralQuote={centralQuote}
    />
  </div>
);

// getInitialProps.
WidgetTopPageMarkup.getInitialProps = async ({ query }) => {
  return {
    namespacesRequired: ['common'],
    query,
  };
};

// i18n.
const WidgetTopPageI18N = withTranslation('common')(WidgetTopPageMarkup);

// Container.
const GQL_WIDGET_PAGE = gql`
  query WidgetTopPage ($date: String, $currencies: [String!], $excludeBanks: [String!], $includeBanks: [String!]) {
    centralQuote: bestQuote(date: $date, currencies: $currencies, includeBanks: $includeBanks) {
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
    bestBidQuote: bestQuote(date: $date, currencies: $currencies, excludeBanks: $excludeBanks) {
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
    bestAskQuote: bestQuote(date: $date, currencies: $currencies, excludeBanks: $excludeBanks, type: "ask") {
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
  }
`;

export default _compose(
  graphql(
    GQL_WIDGET_PAGE,
    {
      options: () => ({
        variables: {
          date: today(),
          currencies: baseCurrenciesArr,
          excludeBanks: [centralBank.slug],
          includeBanks: [centralBank.slug],
        },
      }),
      props: ({ data: { centralQuote, bestBidQuote, bestAskQuote } }) => ({
        centralQuote, bestBidQuote, bestAskQuote
      }),
    },
  ),
)(WidgetTopPageI18N);
