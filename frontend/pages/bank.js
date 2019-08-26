import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import { today } from '../lib/moment'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdateInstitution, DeleteInstitution } from '../features/Institution'

const BankPageMarkup = ({ query: { action }, institution, allQuote, post }) => {
  if (!institution) {
    return null
  }

  const { slug } = institution;

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
                    as={`/banks/${slug}/update`}>
                <a>{'Update'}</a>
              </Link>
              &nbsp;|&nbsp;
              <DeleteInstitution institution={institution}/>
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
                    {
                      !!allQuote.length
                        ? allQuote.map((quote, i) => (
                          <tr key={i}>
                            <td>{quote.currencyVObj.name}</td>
                            <td>{quote.amount} {quote.currencyVObj.slug}</td>
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
            </React.Fragment>
          )
        }

        {action && <UpdateInstitution institution={institution}/>}
      </Page>
    </Layout>
  )
};

// getInitialProps.
BankPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  }
};

// i18n.
const BankPageI18N = withTranslation('common')(BankPageMarkup);

// Container.
const GQL_INSTITUTION = gql`
  query BankPage ($slug: String!, $where: QuoteWhereInput!, $postSlug: String!) {
    institution(slug: $slug) {
      id
      slug
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
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_INSTITUTION,
    {
      options: ({ query, fullPath }) => ({
        variables: {
          slug: query.slug,
          where: {
            institution: { refSlug: query.slug },
            date: today(),
            error: 'no',
          },
          postSlug: fullPath,
        },
      }),
      props: ({ data: { institution, allQuote, post } }) => ({
        institution,
        allQuote,
        post,
      }),
    }
  )
)(BankPageI18N)
