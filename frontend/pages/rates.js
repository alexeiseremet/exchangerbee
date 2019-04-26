import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

class RatesPageMarkup extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  render () {
    const {allQuote} = this.props

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
            allQuote && (
              <List type="ordered">
                {
                  allQuote.map((
                    {id, currency, baseCurrency, institution, ask, bid}
                  ) => (
                    <li key={id}>
                      <Link href={`/rate?slug=${currency.slug}-${baseCurrency.slug}`}
                            as={`/rates/${currency.slug}-${baseCurrency.slug}`} prefetch>
                        <a>{institution.name} {ask} {bid}</a>
                      </Link>
                    </li>
                  ))
                }
              </List>
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
      }
      baseCurrency {
        slug
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
