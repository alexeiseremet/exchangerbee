import React from 'react'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

import List from '../features/List'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { CreateInstitution } from '../features/Institution'

class BanksPageMarkup extends React.Component {
  static async getInitialProps({ query }) {
    return {
      namespacesRequired: ['common'],
      query
    }
  }

  render() {
    const { query: { action }, allInstitution } = this.props;

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
            !action && allInstitution && (
              <React.Fragment>
                <Link href={`/banks?action=create`} as={`/banks/create`} prefetch>
                  <a>{'Create'}</a>
                </Link>
                <hr />

                <List type="ordered">
                  {
                    allInstitution.map(({ id, slug, name }) => (
                      <li key={id}>
                        <Link href={`/bank?slug=${slug}`} as={`/banks/${slug}`} prefetch>
                          <a>{name}</a>
                        </Link>
                      </li>
                    ))
                  }
                </List>
              </React.Fragment>
            )
          }

          {action && <CreateInstitution />}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const BanksPageI18N = withNamespaces('common')(BanksPageMarkup);

// Container.
const GQL_ALL_INSTITUTION = gql`
  query AllInstitution {
    allInstitution {
      id
      slug
      name
    }
  }
`;

export default compose(
  graphql(
    GQL_ALL_INSTITUTION,
    {
      props: ({ data: { allInstitution } }) => ({
        allInstitution
      })
    }
  )
)(BanksPageI18N)
