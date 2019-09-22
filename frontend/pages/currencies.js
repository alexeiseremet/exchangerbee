import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { baseCountry } from '../server.config';
import { Link, withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import CurrencyCard from '../features/CurrencyCard';
import { CreateCurrency } from '../features/Currency';

const CurrenciesPageMarkup = ({ query: { action }, allCurrency, post }) => (
  <Layout metadata={{
    title: 'Lista valute',
    description: `Lista valutelor negociate la băncile din ${baseCountry.name}`,
  }}>
    <Page>
      {
        action
          ? <CreateCurrency/>
          : (
            <>
              <Link href="/currencies?action=create" as="/currencies/create">
                <a>Create</a>
              </Link>
              <hr/>

              {
                <div className="page-heading">
                  <h1>
                    {
                      post
                        ? post.title
                        : `Lista valutelor negociate la băncile din ${baseCountry.name}`
                    }
                  </h1>
                </div>
              }

              {
                allCurrency && (
                  <section>
                    {
                      allCurrency.map((currency, i) => <CurrencyCard key={i} currency={currency}/>)
                    }
                  </section>
                )
              }
            </>
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
      id
      slug
      name
      numCode
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
