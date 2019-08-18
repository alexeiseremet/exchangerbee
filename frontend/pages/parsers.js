import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import List from '../features/List'
import { CreateParser } from '../features/Parser'

class ParsersPageMarkup extends React.Component {
  static async getInitialProps({ query }) {
    return {
      namespacesRequired: ['common'],
      query
    }
  }

  render() {
    const { query: { action }, allParser } = this.props;

    return (
      <Layout>
        <Metadata
          title={t.metaTitle}
          description={t.metaDescription}
          ogTitle={t.ogTitle}
          ogDescription={t.ogDescription}
        />
        <Page>
          {
            !action && allParser && (
              <React.Fragment>
                <Link href={`/parsers?action=create`} as={`/parsers/create`} prefetch>
                  <a>{'Create'}</a>
                </Link>
                <hr />

                <List type="ordered">
                  {
                    allParser.map(({ id, url }) => (
                      <li key={id}>
                        <Link href={`/parser?id=${id}`} as={`/parsers/${id}`} prefetch>
                          <a>{url}</a>
                        </Link>
                      </li>
                    ))
                  }
                </List>
              </React.Fragment>
            )
          }

          {action && <CreateParser />}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const ParsersPageI18N = withNamespaces('common')(ParsersPageMarkup);

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
        allParser
      })
    }
  )
)(ParsersPageI18N)
