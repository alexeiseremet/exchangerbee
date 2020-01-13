import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';
import _filter from 'lodash/filter';
import _maxBy from 'lodash/maxBy';
import _minBy from 'lodash/minBy';

import { centralBank, baseCurrency, baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today, xDaysAgo } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import QuoteCard from '../features/QuoteCard';
import RateCard from '../features/RateCard';
import CurrencyTop from '../features/CurrencyTop';
import ConverterWidget from '../features/ConverterWidget';
import Chart from '../features/Chart';

const CurrencyPageMarkup = ({
  currency, allQuote, post, fullPath, archiveQuote,
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
      title: `Curs valutar ${currency.name} (${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}) — ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()})`,
      description: `
        ✅ Cursul valutar pentru ${currency.name} (${String(currency.slug).toUpperCase()}) afişat la băncile din ${baseCountry.name}.
        ✅ Convertor valutar după cursul ${String(centralBank.slug).toUpperCase()} de azi.
      `,
    }}>
      <Page
        heading={`
          Curs ${String(currency.name).toLowerCase()} 
          în raport cu ${String(baseCurrency.name).toLowerCase()} 
        `}
      >
        {
          centralQuote && (
            <div className="page-lead" style={{ marginBottom: '3rem' }}>
              <CurrencyTop
                currency={currency}
                centralQuote={centralQuote}
                bestBid={bestBid}
                bestAsk={bestAsk}
              />
            </div>
          )
        }

        <h2
          style={{
            marginBottom: '1.19rem',
            fontSize: '1.6rem',
            lineHeight: '1.3',
            opacity: '0.8',
          }}
          dangerouslySetInnerHTML={{ __html: `Convertor valutar după cursul ${String(centralBank.slug).toUpperCase()} de azi` }}
        />

        <div className="page-lead" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <ConverterWidget />
        </div>

        <section style={{ marginTop: '3rem' }}>
          <h2
            style={{
              marginBottom: '1.19rem',
              fontSize: '1.6rem',
              lineHeight: '1.3',
              opacity: '0.8',
            }}
            dangerouslySetInnerHTML={{
              __html: (`
                      Cursul valutar pentru
                      ${currency.name} (${String(currency.slug).toUpperCase()})
                      afişat la băncile din ${baseCountry.name}
                    `),
            }}
          />

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
                              info={'cumpără'}
                            />
                          </div>
                          <div className="flex__item-grow">
                            <RateCard
                              key="ask"
                              value={quote.ask}
                              info={'vinde'}
                            />
                          </div>
                        </div>
                      </QuoteCard>
                    ))
                  }
                </div>
              </>
            ) : <p>{'Nu a fost găsit niciun rezultat.'}</p>
          }
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2
            style={{
              marginBottom: '1.19rem',
              fontSize: '1.6rem',
              lineHeight: '1.3',
              opacity: '0.8',
            }}
            dangerouslySetInnerHTML={{ __html: `Evoluție curs valutar oficial pentru ${currency.name}, ${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}` }}
          />

          {
            /*
            Evoluția cursului oficial pentru 1 Dolar american, USD/MDL
            Utilizați graficul evoluției și urmăriți dinamica dolarului american (USD),
            în diferite perioade de timp: pe săptămână, lună, an, zi.
            */
          }

          {
            archiveQuote.map(currency => (
              <Chart data={currency.quote} id={currency.slug} key={currency.slug} />
            ))
          }
        </section>

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
  query CurrencyPage ($slug: String!, $where: QuoteWhereInput, $archiveWhere: QuoteArchiveWhereInput, $postSlug: String) {
    currency(slug: $slug) {
      slug
      name
    }
    allQuote(where: $where) {
      institutionVObj {
        name
        slug
      }
      bid
      ask
    }
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
    archiveQuote(where: $archiveWhere) {
      slug
      quote {
        bid
        date
      }
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
            date: [today()],
            error: 'no',
          },
          postSlug: fullPath,
          archiveWhere: {
            date: [xDaysAgo(90), today()],
            currencies: [query.slug],
            includeBanks: [centralBank.slug],
          },
        },
      }),
      props: ({
        data: {
          currency, allQuote, post, archiveQuote,
        },
      }) => ({
        currency,
        allQuote,
        post,
        archiveQuote,
      }),
    },
  ),
)(CurrencyPageI18N);
