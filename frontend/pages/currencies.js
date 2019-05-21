import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { CreateCurrency } from '../features/Currency'

class BanksPageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query
    }
  }

  render () {
    const {allCurrency, query: {action}} = this.props

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
            !action && allCurrency && (
              <React.Fragment>
                <Link href={`/currencies?action=create`} as={`/currencies/create`} prefetch>
                  <a>{'Create'}</a>
                </Link>
                <hr/>

                <List type="ordered">
                  {
                    allCurrency.map(({id, slug, name}) => (
                      <li key={id}>
                        <Link href={`/currency?slug=${slug}`} as={`/currencies/${slug}`} prefetch>
                          <a>{name}</a>
                        </Link>
                      </li>
                    ))
                  }
                </List>
              </React.Fragment>
            )
          }

          {action && <CreateCurrency/>}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const BanksPageI18N = withNamespaces('common')(BanksPageMarkup)

// Container.
const GQL_ALL_CURRENCY = gql`
  query AllCurrency {
    allCurrency {
      id
      slug
      name
    }
  }
`

export default compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      props: ({data: {allCurrency}}) => ({
        allCurrency
      })
    }
  )
)(BanksPageI18N)
