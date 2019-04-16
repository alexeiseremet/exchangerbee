import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

class BanksPageMarkup extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  render () {
    const {allInstitution} = this.props

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
            allInstitution && (
              <List type="ordered">
                {
                  allInstitution.map(({id, slug, name}) => (
                    <li key={id}>
                      <Link prefetch href={`/banks/${slug}`}>
                        <a>{name}</a>
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
const BanksPageI18N = withNamespaces('common')(BanksPageMarkup)

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
)(BanksPageI18N)
