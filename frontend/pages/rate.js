import React from 'react'
import { withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

class RatePageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render () {
    const {quote} = this.props

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
            quote && (
              <div>{quote.createdAt} {quote.ask} {quote.bid}</div>
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
  query Quote ($slug: String!) {
    quote(slug: $slug) {
      createdAt
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
