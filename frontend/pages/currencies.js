import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import CurrencyCard from '../features/CurrencyCard';
import Ad from '../features/Ad';

const CurrenciesPageMarkup = ({ allCurrency, fullPath }) => (
  <Layout metadata={{
    url: `${fullPath}`,
    title: `Lista valute — ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()})`,
    description: `✅ Lista valutelor negociate la băncile din ${baseCountry.name}`,
  }}>
    <Page heading={`Lista valutelor negociate la băncile din ${baseCountry.name}`}>
      <Ad />

      {
        allCurrency && (
          <section className="currency-list">
            {
              allCurrency.map((c, i) => <CurrencyCard key={i} currency={c}/>)
            }
          </section>
        )
      }
    </Page>
  </Layout>
);

// getInitialProps.
CurrenciesPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  };
};

// i18n.
const CurrenciesPageI18N = withTranslation('common')(CurrenciesPageMarkup);

// Container.
const GQL_ALL_CURRENCY = gql`
  query AllCurrency {
    allCurrency {
      slug
      name
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      props: ({ data: { allCurrency } }) => ({
        allCurrency,
      }),
    },
  ),
)(CurrenciesPageI18N);
