import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';
import _filter from 'lodash/filter';
import _maxBy from 'lodash/maxBy';
import _minBy from 'lodash/minBy';

import { centralBank, baseCurrency, baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today, localeDate } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import QuoteCard from '../features/QuoteCard';
import RateCard from '../features/RateCard';

const CurrencyPageMarkup = ({ currency, allQuote, post }) => {
  if (!currency) {
    return null;
  }

  const allQuoteValid = allQuote && allQuote.length;

  const allQuoteNoCentral = (
    allQuoteValid
      ? _filter(allQuote, (q) => q.institutionVObj.slug !== centralBank.slug)
      : []
  );
  const centralQuote = _filter(allQuote, (q) => q.institutionVObj.slug === centralBank.slug)[0];
  const bestBid = _maxBy(allQuoteNoCentral, 'bid');
  const bestAsk = _minBy(allQuoteNoCentral, 'ask');

  return (
    <Layout metadata={{
      title: `${currency.name} — curs valutar ${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}`,
      description: `Curs ${String(currency.name).toLowerCase()} în raport cu ${String(baseCurrency.name).toLowerCase()}.`,
    }}>
      <Page>
        <div className="page-heading">
          <h1>
            {`
              Curs ${String(currency.name).toLowerCase()} 
              în raport cu ${String(baseCurrency.name).toLowerCase()} 
            `}
          </h1>
        </div>

        {
          post && post.textFirst && (
            <p dangerouslySetInnerHTML={{ __html: post.textFirst }} />
          )
        }

        {
          centralQuote && (
            <section style={{
              margin: '3rem 0',
              padding: '1rem 2rem',
              backgroundColor: '#eaeaea',
              borderRadius: '.6rem',
            }}>
              <table>
                <caption dangerouslySetInnerHTML={{
                  __html: `
                    Cursul oficial şi cele mai bune rate de schimb pentru ${currency.name} 
                    oferite de băncile din ${baseCountry.name}, ${localeDate()}
                  `,
                }}/>
                <tbody>
                <tr>
                  <th style={{ verticalAlign: 'bottom' }}>
                    <strong
                      title={currency.name}
                      style={{
                        fontFamily: 'Georgia, Lucida Bright, serif',
                        fontStyle: 'italic',
                        fontSize: '3rem',
                      }}
                    >
                      {currency.slug}
                    </strong>
                  </th>
                  <td>
                    <RateCard
                      key="central"
                      value={centralQuote.bid}
                      label={String(centralBank.slug).toUpperCase()}
                      info={String(baseCurrency.slug).toUpperCase()}
                    />
                  </td>
                  <td>
                    <RateCard
                      key="bid"
                      value={bestBid.bid}
                      label={bestBid.institutionVObj.name}
                      info="cumpărare"
                    />
                  </td>
                  <td>
                    <RateCard
                      key="ask"
                      value={bestAsk.ask}
                      label={bestAsk.institutionVObj.name}
                      info="vânzare"
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            </section>
          )
        }

        <section className="quote-list">
          {
            allQuoteNoCentral.length ? (
              <>
                {
                  allQuoteNoCentral.map((quote, i) => (
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
                }

                <p
                  style={{
                    marginTop: '.5rem',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    opacity: '0.65',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: (
                      `Ratele de shimb pentru 
                      <strong>${currency.name}</strong> (${String(currency.slug).toUpperCase()})
                      afişate la băncile din ${baseCountry.name}`
                    ),
                  }}/>
              </>
            ) : <p>Nu a fost găsit niciun rezultat.</p>
          }
        </section>

        {
          /*
          {`Evoluția cursului oficial pentru ${currency.name},
          ${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}`}
          */
        }

        {
          post && post.textSecond && (
            <p style={{ marginTop: '3rem' }}
               dangerouslySetInnerHTML={{ __html: post.textSecond }}
            />
          )
        }
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
      slug
      name
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
