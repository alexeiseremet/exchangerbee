import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { UpdateQuote, DeleteQuote } from '../features/Quote'

class RatePageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render () {
    const {quote, query: {action}} = this.props
    if (!quote) {
      return null
    }

    const {id, institution} = quote

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
            !action && (
              <React.Fragment>
                <Link href={`/rate?id=${id}&action=update`} as={`/rates/${id}/update`} prefetch>
                  <a>{'Update'}</a>
                </Link>
                &nbsp;|&nbsp;
                <DeleteQuote quote={quote}/>
                <hr/>

                <h1>{institution}</h1>
              </React.Fragment>
            )
          }

          {action && <UpdateQuote quote={quote}/>}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const RatePageI18N = withNamespaces('common')(RatePageMarkup)

// Container.
const GQL_QUOTE = gql`
  query Quote ($id: ID!) {
    quote(id: $id) {
      id
      institution
      currency
      date
      amount
      bid
      ask
      period
      error
    }
  }
`

export default compose(
  graphql(
    GQL_QUOTE,
    {
      options: ({query}) => ({
        variables: {
          id: query.id,
        },
      }),
      props: ({data: {quote}}) => ({
        quote
      }),
    }
  )
)(RatePageI18N)
