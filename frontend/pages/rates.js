import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { CreateQuote } from '../features/Quote'

class RatesPageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query
    }
  }

  render () {
    const {allQuote, query: {action}} = this.props

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
            !action && allQuote && (
              <React.Fragment>
                <Link href={`/rates?action=create`} as={`/rates/create`} prefetch>
                  <a>{'Create'}</a>
                </Link>
                <hr/>

                <List type="ordered">
                  {
                    allQuote.map(({id, institution, currency}) => (
                      <li key={id}>
                        <Link href={`/rate?id=${id}`} as={`/rates/${id}`} prefetch>
                          <a>{institution}-{currency}</a>
                        </Link>
                      </li>
                    ))
                  }
                </List>
              </React.Fragment>
            )
          }

          {action && <CreateQuote/>}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const RatesPageI18N = withNamespaces('common')(RatesPageMarkup)

// Container.
const GQL_ALL_QUOTE = gql`
  query AllQuote {
    allQuote {
      id
      institution
      currency
    }
  }
`

export default compose(
  graphql(
    GQL_ALL_QUOTE,
    {
      props: ({data: {allQuote}}) => ({
        allQuote
      })
    }
  )
)(RatesPageI18N)
