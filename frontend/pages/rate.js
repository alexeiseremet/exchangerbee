import React from 'react'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const RatePageMarkup = ({quote}) => (
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

// Container.
const GQL_QUOTE = gql`
  query Quote {
    quote {
      createdAt,
      ask,
      bid,
    },
  }
`

export default compose(
  graphql(
    GQL_QUOTE,
    {
      props: ({data: {quote}}) => ({
        quote
      })
    }
  )
)(RatePageMarkup)
