import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { UpdateCurrency, DeleteCurrency } from '../../features/Currency';

const AdminCurrencyPageMarkup = ({ currency }) => {
  if (!currency) {
    return null;
  }

  return (
    <Layout metadata={{ title: currency.name }}>
      <Page type="admin">
        <DeleteCurrency currency={currency}/>
        <hr/>
        <UpdateCurrency currency={currency}/>
      </Page>
    </Layout>
  );
};

// getInitialProps.
AdminCurrencyPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const AdminCurrencyPageI18N = withTranslation('common')(AdminCurrencyPageMarkup);

// Container.
const GQL_CURRENCY_PAGE = gql`
  query CurrencyPage ($slug: String!) {
    currency(slug: $slug) {
      id
      slug
      name
      numCode
      symbol
    }
  }
`;

const AdminCurrencyPageGQL = _compose(
  graphql(
    GQL_CURRENCY_PAGE,
    {
      options: ({ query }) => ({
        variables: {
          slug: query.slug,
        },
      }),
      props: ({ data: { currency } }) => ({
        currency,
      }),
    },
  ),
)(AdminCurrencyPageI18N);

export default securePage(AdminCurrencyPageGQL);
