import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { CreateParser } from '../features/Parser'

class BanksPageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query
    }
  }

  render () {
    const {allParser, query: {action}} = this.props

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
                <hr/>

                <List type="ordered">
                  {
                    allParser.map(({id, url}) => (
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

          {action && <CreateParser/>}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const BanksPageI18N = withNamespaces('common')(BanksPageMarkup)

// Container.
const GQL_ALL_PARSER = gql`
  query AllParser {
    allParser {
      id
      url
      period
    }
  }
`

export default compose(
  graphql(
    GQL_ALL_PARSER,
    {
      props: ({data: {allParser}}) => ({
        allParser
      })
    }
  )
)(BanksPageI18N)
