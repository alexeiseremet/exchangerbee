import React from 'react'
import { withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

class BankPageMarkup extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  render () {
    const {institution} = this.props

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
            institution && (
              <div>{institution.name}</div>
            )
          }
        </Page>
      </Layout>
    )
  }
}

// i18n.
const BankPageI18N = withNamespaces('common')(BankPageMarkup)

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
)(BankPageI18N)