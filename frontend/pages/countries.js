import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

class CountriesPageMarkup extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  render () {
    const {allCountry} = this.props

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
            allCountry && (
              <List type="ordered">
                {
                  allCountry.map(({id, slug, name}) => (
                    <li key={id}>
                      <Link prefetch href={`/countries/${slug}`}>
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
const CountriesPageI18N = withNamespaces('common')(CountriesPageMarkup)

// Container.
const GQL_ALL_COUNTRY = gql`
  query AllCountry {
    allCountry {
      id,
      slug,
      name,
    },
  }
`

export default compose(
  graphql(
    GQL_ALL_COUNTRY,
    {
      props: ({data: {allCountry}}) => ({
        allCountry
      })
    }
  )
)(CountriesPageI18N)
