import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { UpdateInstitution, DeleteInstitution } from '../features/Institution'

class BankPageMarkup extends React.Component {
  static async getInitialProps ({query}) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render () {
    const {institution, query: {action}} = this.props
    if (!institution) {
      return null
    }

    const {name, slug} = institution

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
                <Link href={`/bank?slug=${slug}&action=update`} as={`/banks/${slug}/update`} prefetch>
                  <a>{'Update'}</a>
                </Link>
                &nbsp;|&nbsp;
                <DeleteInstitution institution={institution}/>
                <hr/>

                <h1>{name}</h1>
              </React.Fragment>
            )
          }

          {action && <UpdateInstitution institution={institution}/>}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const BankPageI18N = withNamespaces('common')(BankPageMarkup)

// Container.
const GQL_INSTITUTION = gql`
  query Institution ($slug: String!) {
    institution(slug: $slug) {
      id
      slug
      name
    }
  }
`

export default compose(
  graphql(
    GQL_INSTITUTION,
    {
      options: ({query}) => ({
        variables: {
          slug: query.slug,
        },
      }),
      props: ({data: {institution}}) => ({
        institution
      }),
    }
  )
)(BankPageI18N)
