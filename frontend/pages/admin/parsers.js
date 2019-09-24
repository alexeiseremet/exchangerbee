import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import List from '../../features/List';
import { CreateParser } from '../../features/Parser';

const ParsersPageMarkup = ({ query: { action }, allParser }) => (
  <Layout metadata={{ title: 'Parsers' }}>
    <Page type="admin">
      {
        action
          ? <CreateParser/>
          : (
            <>
              <Link href="/admin/parsers?action=create" as="/admin/parsers/create">
                <a>Create</a>
              </Link>
              <hr/>

              {
                allParser && allParser.length && (
                  <List type="ordered">
                    {
                      allParser.map(({ id, url }) => (
                        <li key={id}>
                          <Link href={`/admin/parser?id=${id}`} as={`/admin/parsers/${id}`}>
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

const ParsersPageGQL = _compose(
  graphql(
    GQL_ALL_PARSER,
    {
      props: ({ data: { allParser } }) => ({
        allParser,
      }),
    },
  ),
)(ParsersPageI18N);

export default securePage(ParsersPageGQL);
