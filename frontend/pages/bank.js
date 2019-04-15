import React from 'react'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const BankPageMarkup = ({institution}) => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />

    <Page>
      {
        institution && (
          <div>{institution.name}</div>
        )
      }
    </Page>
  </Layout>
)

// Container.
const GQL_INSTITUTION = gql`
  query Institution {
    institution(slug: "bnm") {
      id,
      slug,
      name,
    },
  }
`

export default compose(
  graphql(
    GQL_INSTITUTION,
    {
      props: ({data: {institution}}) => ({
        institution
      })
    }
  )
)(BankPageMarkup)
