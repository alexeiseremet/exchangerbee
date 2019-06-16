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

class QuotesPageMarkup extends React.Component {
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
                <Link href={`/quotes?action=create`} as={`/quotes/create`} prefetch>
                  <a>{'Create'}</a>
                </Link>
                <hr/>

                <List type="ordered">
                  {
                    allQuote.map(({id, institution, currency}) => (
                      <li key={id}>
                        <Link href={`/quote?id=${id}`} as={`/quotes/${id}`} prefetch>
                          <a>{institution.refId}-{currency.refId}</a>
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
const QuotesPageI18N = withNamespaces('common')(QuotesPageMarkup)

// Container.
const GQL_ALL_QUOTE = gql`
  query AllQuote {
    allQuote {
      id
      institution {
        refId
        refSlug
      }
      currency {
        refId
        refSlug
      }
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
)(QuotesPageI18N)