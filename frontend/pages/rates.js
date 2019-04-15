import React from 'react'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const RatesPageMarkup = ({allQuote}) => (
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
                  <a href={`/rates/${currency.slug}-${baseCurrency.slug}`}>
                    {institution.name} {ask} {bid}
                  </a>
                </li>
              ))
            }
          </List>
        )
      }
    </Page>
  </Layout>
)

// Container.
const GQL_ALL_QUOTE = gql`
  query AllQuote {
    allQuote {
      id,
      institution {
        id,
        name,
      },
      currency {
        slug,
      },
      baseCurrency {
        slug,
      },
      ask,
      bid,
    },
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
)(RatesPageMarkup)
