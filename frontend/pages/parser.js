import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { UpdateParser, DeleteParser } from '../features/Parser'

class ParserPageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render () {
    const {parser, query: {action}} = this.props
    if (!parser) {
      return null
    }

    const {id, url} = parser

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
                <Link href={`/parser?id=${id}&action=update`} as={`/parsers/${id}/update`} prefetch>
                  <a>{'Update'}</a>
                </Link>
                &nbsp;|&nbsp;
                <DeleteParser parser={parser}/>
                <hr/>

                <h1>{url}</h1>
              </React.Fragment>
            )
          }

          {action && <UpdateParser parser={parser}/>}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const ParserPageI18N = withNamespaces('common')(ParserPageMarkup)

// Container.
const GQL_PARSER = gql`
  query Parser ($id: ID!) {
    parser(id: $id) {
      id
      institution
      url
      period
      processedAt
      quotes {
        amount
        currency
        xPaths {
          bid
          ask
          code
        }
      }
    }
  }
`

export default compose(
  graphql(
    GQL_PARSER,
    {
      options: ({query}) => ({
        variables: {
          id: query.id,
        },
      }),
      props: ({data: {parser}}) => ({
        parser
      }),
    }
  )
)(ParserPageI18N)
