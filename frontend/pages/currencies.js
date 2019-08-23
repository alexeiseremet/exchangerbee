import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import List from '../features/List'
import { CreateCurrency } from '../features/Currency'

const CurrenciesPageMarkup = ({ query: { action }, allCurrency }) => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />
    <Page>
      {
        !action && allCurrency && (
          <React.Fragment>
            <Link href={`/currencies?action=create`} as={`/currencies/create`}>
              <a>{'Create'}</a>
            </Link>
            <hr/>

            <List type="ordered">
              {
                allCurrency.map(({ id, slug, name }) => (
                  <li key={id}>
                    <Link href={`/currency?slug=${slug}`} as={`/currencies/${slug}`}>
                      <a>{name}</a>
                    </Link>
                  </li>
                ))
              }
            </List>
          </React.Fragment>
        )
      }

      {action && <CreateCurrency/>}
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
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      props: ({ data: { allCurrency } }) => ({
        allCurrency
      })
    }
  )
)(CurrenciesPageI18N)
