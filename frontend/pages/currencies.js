import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import CurrencyCard from '../features/CurrencyCard';

const CurrenciesPageMarkup = (props) => {
  const { t, allCurrency, fullPath } = props;
  const { baseCountry } = getTranslatedConfig(t);
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `(${tBCS}) ${t('Lista valutelor negociate la bănci')} — ${tBCN}`,
      description: t('✅ Lista valutelor negociate la băncile din {{tBCN}}', { tBCN }),
    }}>
      <Page heading={`(${tBCS}) ${tBCN}: ${t('Lista valutelor negociate la bănci').toLowerCase()}`}>
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
};

// getInitialProps.
CurrenciesPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    query,
    fullPath,
  };
};

// i18n.
const CurrenciesPageI18N = withTranslation()(CurrenciesPageMarkup);

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
