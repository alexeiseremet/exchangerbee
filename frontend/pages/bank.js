import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrency } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import RateCard from '../features/RateCard';
import QuoteCard from '../features/QuoteCard';

const BankPageMarkup = ({ institution, allQuote, post }) => {
  if (!institution) {
    return null;
  }

  return (
    <Layout metadata={{
      title: `${institution.name} — curs valutar ${String(institution.slug).toUpperCase()}`,
      description: `Cursul valutar la ${institution.name}`,
    }}>
      <Page>
        <div className="page-heading">
          <h1>
            {`Cursul valutar la ${institution.name}`}
          </h1>
        </div>

        {
          post && post.textFirst && (
            <p dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
          )
        }

        <section className="quote-list">
          {
            allQuote && allQuote.length ? (
              allQuote.map(
                (quote, i) => (
                  <QuoteCard
                    key={i}
                    label={quote.currencyVObj.name}
                    link={{
                      href: `/currency?slug=${quote.currencyVObj.slug}`,
                      as: `/currencies/${quote.currencyVObj.slug}`,
                    }}
                  >
                    <>
                      {
                        institution.slug !== centralBank.slug && (
                          <RateCard
                            key="bid"
                            value={quote.bid}
                            info={
                              institution.slug === centralBank.slug
                                ? String(baseCurrency.slug).toUpperCase()
                                : 'cumpărare'
                            }
                          />
                        )
                      }
                    </>

                    <RateCard
                      key="ask"
                      value={quote.ask}
                      info={
                        institution.slug === centralBank.slug
                          ? String(baseCurrency.slug).toUpperCase()
                          : 'vânzare'
                      }
                    />
                  </QuoteCard>
                ),
              )
            ) : <p>Nu a fost găsit niciun rezultat.</p>
          }
        </section>

        {
          post && post.textSecond && (
            <p style={{ marginTop: '3rem' }}
               dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
          )
        }
      </Page>
    </Layout>
  );
};

// getInitialProps.
BankPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  };
};

// i18n.
const BankPageI18N = withTranslation('common')(BankPageMarkup);

// Container.
const GQL_BANK_PAGE = gql`
  query BankPage ($slug: String!, $where: QuoteWhereInput!, $postSlug: String!) {
    institution(slug: $slug) {
      slug
      name
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
    GQL_BANK_PAGE,
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
    },
  ),
)(BankPageI18N);
