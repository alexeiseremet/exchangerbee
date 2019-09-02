import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';
import { textIndexPage as t } from '../lib/locale';
import { localeDate } from '../lib/moment';

import Metadata from '../features/Metadata';
import Layout from '../features/Layout';
import Page from '../features/Page';
import List from '../features/List';
import { CreateQuote } from '../features/Quote';

const QuotesPageMarkup = ({ query: { action }, allQuote }) => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />
    <Page>
      {
        !action && allQuote && (
          <>
            <Link href="/quotes?action=create" as="/quotes/create">
              <a>Create</a>
            </Link>
            <hr />

            <List type="ordered">
              {
                allQuote.map(({
                  id, institutionVObj, currencyVObj, date, error,
                }) => (
                  <li key={id} style={{ color: error === 'yes' ? 'red' : null }}>
                    <Link href={`/quote?id=${id}`} as={`/quotes/${id}`}>
                      <a>
                        {localeDate(date)}
                        {' '}
--
                        {institutionVObj.name}
                        {' '}
--
                        {currencyVObj.name}
                      </a>
                    </Link>
                  </li>
                ))
              }
            </List>
          </>
        )
      }

      {action && <CreateQuote />}
    </Page>
  </Layout>
);

// getInitialProps.
QuotesPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const QuotesPageI18N = withTranslation('common')(QuotesPageMarkup);

// Container.
const GQL_ALL_QUOTE = gql`
  query AllQuote {
    allQuote {
      id
      institutionVObj {
        name
      }
      currencyVObj {
        name
      }
      date
      error
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_QUOTE,
    {
      props: ({ data: { allQuote } }) => ({
        allQuote,
      }),
    },
  ),
)(QuotesPageI18N);
