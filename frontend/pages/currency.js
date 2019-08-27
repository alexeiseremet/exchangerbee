import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import { today, localeDate } from '../lib/moment'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdateCurrency, DeleteCurrency } from '../features/Currency'

const CurrencyPageMarkup = ({ query: { action }, currency, allQuote, post }) => {
  if (!currency) {
    return null
  }

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
              <Link href={`/currency?slug=${currency.slug}&action=update`}
                    as={`/currencies/${currency.slug}/update`}>
                <a>{'Update'}</a>
              </Link>
              &nbsp;|&nbsp;
              <DeleteCurrency currency={currency}/>
              <hr/>

              {
                post && (
                  <React.Fragment>
                    <h1 style={{ marginBottom: '10px', fontSize: '18px' }}>
                      {post.title}
                    </h1>

                    <p dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
                  </React.Fragment>
                )
              }

              <p style={{ textTransform: 'uppercase', fontSize: '13px', fontWeight: '700' }}>
                {`Cursul oficial şi cele mai bune rate de schimb pentru ${currency.name} oferite de băncile din Chişinău, ${localeDate()}`}
              </p>

              {
                allQuote && (
                  <table>
                    <thead>
                    <tr>
                      <th>Banca</th>
                      <th>Unități</th>
                      <th>Cumpărare</th>
                      <th>Vânzare</th>
                      <th>Variație</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      !!allQuote.length
                        ? allQuote.map((quote, i) => (
                          <tr key={i}>
                            <td>{quote.institutionVObj.name}</td>
                            <td>{quote.amount}</td>
                            <td>{quote.bid}</td>
                            <td>{quote.ask}</td>
                            <td>{'current - prev'}</td>
                          </tr>
                        ))
                        : 'Nu exista date'
                    }
                    </tbody>
                  </table>
                )
              }

              <p style={{ textTransform: 'uppercase', fontSize: '13px', fontWeight: '700' }}>
                {`Evoluția cursului oficial pentru 1 ${currency.name}, ${currency.slug}/mdl`}
              </p>

              {
                post && post.textSecond && (
                  <p dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
                )
              }
            </React.Fragment>
          )
        }

        {action && <UpdateCurrency currency={currency}/>}
      </Page>
    </Layout>
  )
};

// getInitialProps.
CurrencyPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  }
};

// i18n.
const CurrencyPageI18N = withTranslation('common')(CurrencyPageMarkup);

// Container.
const GQL_CURRENCY = gql`
  query CurrencyPage ($slug: String!, $where: QuoteWhereInput!, $postSlug: String!) {
    currency(slug: $slug) {
      id
      slug
      name
      numCode
      symbol
    }
    allQuote(where: $where) {
      institutionVObj {
        name
        slug
      }
      amount
      bid
      ask
    }
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_CURRENCY,
    {
      options: ({ query, fullPath }) => ({
        variables: {
          slug: query.slug,
          where: {
            currency: { refSlug: query.slug },
            date: today(),
            error: 'no',
          },
          postSlug: fullPath,
        },
      }),
      props: ({ data: { currency, allQuote, post } }) => ({
        currency,
        allQuote,
        post,
      }),
    }
  )
)(CurrencyPageI18N)
