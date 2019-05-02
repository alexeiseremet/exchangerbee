import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import { withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

class RatePageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render () {
    const {quote, query: {action}} = this.props

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
            !action && quote && (
              <div>{quote.ask} {quote.bid}</div>
            )
          }
        </Page>
      </Layout>
    )
  }
}

// i18n.
const RatePageI18N = withNamespaces('common')(RatePageMarkup)

// Container.
const GQL_QUOTE = gql`
  query Quote ($currency: String!) {
    quote(currency: $slug) {
      ask
      bid
    }
  }
`

export default compose(
  graphql(
    GQL_QUOTE,
    {
      options: ({query}) => ({
        variables: {
          slug: query.slug,
        },
      }),
      props: ({data: {quote}}) => ({
        quote
      }),
    }
  )
)(RatePageI18N)
