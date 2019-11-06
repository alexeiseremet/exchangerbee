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
import CurrencyTop from '../features/CurrencyTop';

const CurrencyPageMarkup = ({
  currency, allQuote, post, fullPath,
}) => {
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
      url: `${fullPath}`,
      title: `${currency.name} — curs valutar ${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}`,
      description: `Curs ${String(currency.name).toLowerCase()} în raport cu ${String(baseCurrency.name).toLowerCase()}.`,
    }}>
      <Page
        heading={`
          Curs ${String(currency.name).toLowerCase()} 
          în raport cu ${String(baseCurrency.name).toLowerCase()} 
        `}
      >
        {
          centralQuote && (
            <CurrencyTop
              currency={currency}
              centralQuote={centralQuote}
              bestBid={bestBid}
              bestAsk={bestAsk}
            />
          )
        }

        <section style={{ marginTop: '3rem' }}>
          {
            allQuoteNoCentral.length ? (
              <>
                <div className="">
                  {
                    allQuoteNoCentral.map((quote, i) => (
                      <QuoteCard
                        key={i}
                        label={quote.institutionVObj.name}
                        link={{
                          href: `/bank?slug=${quote.institutionVObj.slug}`,
                          as: `/banks/${quote.institutionVObj.slug}`,
                        }}
                        style={{
                          marginTop: '.5rem',
                        }}
                      >
                        <div className="flex flex--gutter-sm">
                          <div>
                            <RateCard
                              key="bid"
                              value={quote.bid}
                              info={`cumpără`}
                            />
                          </div>
                          <div className="flex__item-grow">
                            <RateCard
                              key="ask"
                              value={quote.ask}
                              info={`vinde`}
                            />
                          </div>
                        </div>
                      </QuoteCard>
                    ))
                  }
                </div>

                <p
                  style={{
                    marginTop: '.5rem',
                    fontSize: '1.2rem',
                    lineHeight: '1.3',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    opacity: '0.65',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: (`
                      Ratele de shimb pentru
                      <strong>${currency.name}</strong> (${String(currency.slug).toUpperCase()})
                      afişate la băncile din ${baseCountry.name}
                    `),
                  }}/>
              </>
            ) : <p>{'Nu a fost găsit niciun rezultat.'}</p>
          }
        </section>

        {
          /*
          {`Evoluția cursului oficial pentru ${currency.name},
          ${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}`}

          Evoluția cursului oficial pentru 1 Dolar american, USD/MDL
          Utilizați graficul evoluției și urmăriți dinamica dolarului american (USD),
          în diferite perioade de timp: pe săptămână, lună, an, zi.
          */
        }

        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }} />
          )
        }

        {
          post && post.textSecond && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
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
