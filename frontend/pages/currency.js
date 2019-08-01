import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdateCurrency, DeleteCurrency } from '../features/Currency'

class CurrencyPageMarkup extends React.Component {
  static async getInitialProps({ query }) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render() {
    const { query: { action }, currency, allQuote } = this.props;
    if (!currency) {
      return null
    }

    const { name, slug } = currency;

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
                <Link href={`/currency?slug=${slug}&action=update`}
                  as={`/currencies/${slug}/update`}
                  prefetch>
                  <a>{'Update'}</a>
                </Link>
                &nbsp;|&nbsp;
                <DeleteCurrency currency={currency} />
                <hr />

                <h1>{name}</h1>

                {
                  allQuote && (
                    <table>
                      <tbody>
                        {allQuote.map((quote, i) => (
                          <tr key={i}>
                            <td>{quote.institution.refId}</td>
                            <td>{quote.amount}</td>
                            <td>{quote.bid}</td>
                            <td>{quote.ask}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                }
              </React.Fragment>
            )
          }

          {action && <UpdateCurrency currency={currency} />}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const CurrencyPageI18N = withNamespaces('common')(CurrencyPageMarkup)

// Container.
const GQL_CURRENCY = gql`
  query CurrencyPage ($slug: String!, $where: QuoteWhereInput!) {
    currency(slug: $slug) {
      id
      slug
      name
      numCode
      symbol
    }
    allQuote(where: $where) {
      institution {
        refId
        refSlug
      }
      amount
      bid
      ask
    }
  }
`;

export default compose(
  graphql(
    GQL_CURRENCY,
    {
      options: ({ query }) => ({
        variables: {
          slug: query.slug,
          where: { currency: { refSlug: query.slug } }
        },
      }),
      props: ({ data: { currency, allQuote } }) => ({
        currency,
        allQuote
      }),
    }
  )
)(CurrencyPageI18N)
