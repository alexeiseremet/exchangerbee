import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { UpdateCurrency, DeleteCurrency } from '../../features/Currency';
import { UpdateTranslation } from '../../features/Translation';

const AdminCurrencyPageMarkup = ({ currency }) => {
  if (!currency) {
    return null;
  }

  return (
    <Layout metadata={{ title: currency.name }} type="admin">
      <Page>
        <DeleteCurrency currency={currency}/>
        <hr/>
        <UpdateCurrency currency={currency}/>
        <hr/>
        <UpdateTranslation translation={{
          locale: 'ru',
          fields: {
            name: '',
            symbol: currency.symbol,
          },
          model: {
            refId: currency.id,
            refSlug: currency.slug,
            refType: 'currency',
          },
          ...currency.translationVObj,
        }}/>
      </Page>
    </Layout>
  );
};

// getInitialProps.
AdminCurrencyPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const AdminCurrencyPageI18N = withTranslation()(AdminCurrencyPageMarkup);

// Container.
const GQL_CURRENCY_PAGE = gql`
  query CurrencyPage ($slug: String!) {
    currency(slug: $slug) {
      id
      slug
      name
      numCode
      symbol
      image
      translationVObj {
        id
        locale
        model {
          refId
          refSlug
          refType
        }
        fields {
          name
          symbol
        }
      }
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
