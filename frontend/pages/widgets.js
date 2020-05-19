import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import config, { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today, xDaysAgo } from '../lib/moment';

import Metadata from '../features/Metadata';

const WidgetPageMarkup = (props) => {
  const { t, centralQuote, archiveQuote } = props;
  const {
    centralBank, baseCountry, baseCurrency, baseCurrenciesArr,
  } = getTranslatedConfig(t);

  return (
    <>
      <Metadata noindex={true} title="Widgets"/>

      <script id="data-json" type="application/json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          centralBank,
          baseCountry,
          baseCurrency,
          baseCurrenciesArr,
          centralQuote,
          archiveQuote,
        }),
      }}/>
    </>
  );
};

// getInitialProps.
WidgetPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const WidgetPageI18N = withTranslation()(WidgetPageMarkup);

// Container.
const GQL_WIDGET_PAGE = gql`
  query WidgetPage ($date: String, $currencies: [String!], $includeBanks: [String!], $archiveWhere: QuoteArchiveWhereInput) {
    centralQuote: bestQuote(date: $date, currencies: $currencies, includeBanks: $includeBanks) {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
      }
      bid
      ask
    }
    archiveQuote(where: $archiveWhere) {
      quote {
        currencyVObj {
          name
        }
        bid
      }
    }
  }
`;

export default _compose(
  graphql(
    GQL_WIDGET_PAGE,
    {
      options: ({ query }) => ({
        variables: {
          slug: query.slug,
          date: today(),
          currencies: config.baseCurrenciesArr,
          includeBanks: [config.centralBank.slug],
          archiveWhere: {
            date: [xDaysAgo(1), today()],
            currencies: config.baseCurrenciesArr,
            includeBanks: [config.centralBank.slug],
          },
        },
      }),
      props: ({ data: { centralQuote, archiveQuote } }) => ({
        centralQuote,
        archiveQuote,
      }),
    },
  ),
)(WidgetPageI18N);
