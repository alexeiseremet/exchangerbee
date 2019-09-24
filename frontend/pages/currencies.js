import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import CurrencyCard from '../features/CurrencyCard';

const CurrenciesPageMarkup = ({ allCurrency }) => (
  <Layout metadata={{
    title: 'Lista valute',
    description: `Lista valutelor negociate la băncile din ${baseCountry.name}`,
  }}>
    <Page>
      <div className="page-heading">
        <h1>
          {`Lista valutelor negociate la băncile din ${baseCountry.name}`}
        </h1>
      </div>

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
CurrenciesPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

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
