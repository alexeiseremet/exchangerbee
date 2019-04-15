import React from 'react'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const BanksPageMarkup = ({allInstitution}) => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />

    <Page>
      {
        allInstitution && (
          <List type="ordered">
            {
              allInstitution.map(({id, slug, name}) => (
                <li key={id}>
                  <a href={`/banks/${slug}`}>{name}</a>
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
const GQL_ALL_INSTITUTION = gql`
  query AllInstitution {
    allInstitution {
      id,
      slug,
      name,
    },
  }
`

export default compose(
  graphql(
    GQL_ALL_INSTITUTION,
    {
      props: ({data: {allInstitution}}) => ({
        allInstitution
      })
    }
  )
)(BanksPageMarkup)
