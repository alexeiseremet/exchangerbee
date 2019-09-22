import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import List from '../features/List';
import { CreateParser } from '../features/Parser';

const ParsersPageMarkup = ({ query: { action }, allParser }) => (
  <Layout metadata={{ title: 'Parsers' }}>
    <Page>
      {
        action
          ? <CreateParser/>
          : (
            <>
              <Link href="/parsers?action=create" as="/parsers/create">
                <a>Create</a>
              </Link>
              <hr />

              {
                allParser && allParser.length && (
                  <List type="ordered">
                    {
                      allParser.map(({ id, url }) => (
                        <li key={id}>
                          <Link href={`/parser?id=${id}`} as={`/parsers/${id}`}>
                            <a>{url}</a>
                          </Link>
                        </li>
                      ))
                    }
                  </List>
                )
              }
            </>
          )
      }
    </Page>
  </Layout>
);

// getInitialProps.
ParsersPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const ParsersPageI18N = withTranslation('common')(ParsersPageMarkup);

// Container.
const GQL_ALL_PARSER = gql`
  query AllParser {
    allParser {
      id
      url
      period
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_PARSER,
    {
      props: ({ data: { allParser } }) => ({
        allParser,
      }),
    },
  ),
)(ParsersPageI18N);
