import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrency } from '../server.config';
import { Link, withTranslation } from '../lib/i18n';
import { textIndexPage as t } from '../lib/locale';
import { today, localeDate } from '../lib/moment';

import Metadata from '../features/Metadata';
import Layout from '../features/Layout';
import Page from '../features/Page';
import { UpdateCurrency, DeleteCurrency } from '../features/Currency';
import QuoteCard from '../features/QuoteCard';
import RateCard from '../features/RateCard';

const CurrencyPageMarkup = ({
  query: { action }, currency, allQuote, post,
}) => {
  if (!currency) {
    return null;
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
            <>
              <Link
                href={`/currency?slug=${currency.slug}&action=update`}
                as={`/currencies/${currency.slug}/update`}
              >
                <a>Update</a>
              </Link>
              &nbsp;|&nbsp;
              <DeleteCurrency currency={currency} />
              <hr />

              {
                <div className="page-heading">
                  <h1>
                    {
                      post
                        ? post.title
                        : `Curs ${String(currency.name).toLowerCase()} (${String(currency.slug).toUpperCase()})`
                    }
                  </h1>
                </div>
              }

              {
                post && post.textFirst && (
                  <p dangerouslySetInnerHTML={{ __html: post.textFirst }} />
                )
              }

              <p>
                {`Cursul oficial şi cele mai bune rate de schimb pentru ${currency.name} oferite de băncile din Chişinău, ${localeDate()}`}
              </p>

              <h2>
                {`Ratele de shimb pentru ${currency.name} (${String(currency.slug).toUpperCase()}) afişate la băncile din Chişinău`}
              </h2>


              <section className="quote-list">
                {
                  allQuote && allQuote.length ? (
                    allQuote.map((quote, i) => quote.institutionVObj.slug !== centralBank.slug && (
                      <QuoteCard
                        key={i}
                        label={quote.institutionVObj.name}
                        link={{
                          href: `/bank?slug=${quote.institutionVObj.slug}`,
                          as: `/banks/${quote.institutionVObj.slug}`,
                        }}
                      >
                        <RateCard
                          key="bid"
                          value={quote.bid}
                          info="cumpărare"
                        />

                        <RateCard
                          key="ask"
                          value={quote.ask}
                          info="vânzare"
                        />
                      </QuoteCard>
                    ))
                  ) : 'Nu a fost găsit niciun rezultat.'
                }
              </section>

              <p>
                {`Evoluția cursului oficial pentru ${currency.name}, ${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}`}
              </p>

              {
                post && post.textSecond && (
                  <p style={{ marginTop: '3rem' }} dangerouslySetInnerHTML={{ __html: post.textSecond }} />
                )
              }
            </>
          )
        }

        {action && <UpdateCurrency currency={currency} />}
      </Page>
    </Layout>
  );
};

// getInitialProps.
CurrencyPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  };
};

// i18n.
const CurrencyPageI18N = withTranslation('common')(CurrencyPageMarkup);

// Container.
const GQL_CURRENCY_PAGE = gql`
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
    GQL_CURRENCY_PAGE,
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
    },
  ),
)(CurrencyPageI18N);
