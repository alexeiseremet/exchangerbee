import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import { today } from '../lib/moment'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdateInstitution, DeleteInstitution } from '../features/Institution'

class BankPageMarkup extends React.Component {
  static async getInitialProps({ query }) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render() {
    const { query: { action }, institution, allQuote } = this.props;
    if (!institution) {
      return null
    }

    const { name, slug } = institution;

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
                <Link href={`/bank?slug=${slug}&action=update`}
                  as={`/banks/${slug}/update`}
                  prefetch>
                  <a>{'Update'}</a>
                </Link>
                &nbsp;|&nbsp;
                <DeleteInstitution institution={institution} />
                <hr />

                <h1>{name}</h1>

                {
                  allQuote && (
                    <table>
                      <thead>
                        <tr>
                          <th>Valuta</th>
                          <th>Unități</th>
                          <th>Cumpărare</th>
                          <th>Vânzare</th>
                          <th>Variație</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allQuote.map((quote, i) => (
                          <tr key={i}>
                            <td>{quote.currencyVObj.name}</td>
                            <td>{quote.amount} {quote.currencyVObj.slug}</td>
                            <td>{quote.bid}</td>
                            <td>{quote.ask}</td>
                            <td>{'current - prev'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                }
              </React.Fragment>
            )
          }

          {action && <UpdateInstitution institution={institution} />}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const BankPageI18N = withNamespaces('common')(BankPageMarkup);

// Container.
const GQL_INSTITUTION = gql`
  query BankPage ($slug: String!, $where: QuoteWhereInput!) {
    institution(slug: $slug) {
      id
      slug
      name
      category
    }
    allQuote (where: $where) {
      currencyVObj {
        name
        slug
      }
      amount
      bid
      ask
    }
  }
`;

export default compose(
  graphql(
    GQL_INSTITUTION,
    {
      options: ({ query }) => {
        return ({
          variables: {
            slug: query.slug,
            where: {
              institution: { refSlug: query.slug },
              date: today(),
            }
          },
        })
      },
      props: ({ data: { institution, allQuote } }) => ({
        institution,
        allQuote,
      }),
    }
  )
)(BankPageI18N)
