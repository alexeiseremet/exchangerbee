import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import List from '../features/List'
import AddQuote from '../features/AddQuote'

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
              <List type="ordered">
                {
                  allQuote.map((
                    {id, currency, institution, ask, bid}
                  ) => (
                    <li key={id}>
                      <Link href={`/rate?slug=${currency.slug}`}
                            as={`/rates/${currency.slug}`} prefetch>
                        <a>{currency.name} {ask} {bid}</a>
                      </Link>
                    </li>
                  ))
                }
              </List>
            )
          }

          {
            action && (
              <AddQuote action={action}/>
            )
          }
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
      institution {
        id
        name
      }
      currency {
        slug
        name
      }
      ask
      bid
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
