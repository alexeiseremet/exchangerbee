import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';
import _filter from 'lodash/filter';
import _maxBy from 'lodash/maxBy';
import _minBy from 'lodash/minBy';

import config, { getTranslatedConfig } from '../server.config';
import { i18n, withTranslation } from '../lib/i18n';
import { today, xDaysAgo } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import QuoteCard from '../features/QuoteCard';
import RateCard from '../features/RateCard';
import CurrencyTop from '../features/CurrencyTop';
import ConverterWidget from '../features/ConverterWidget';
import Chart from '../features/Chart';

const CurrencyPageMarkup = (props) => {
  const {
    t, lng, currency, allQuote, archiveQuote, allCentralQuote, post, query, fullPath,
  } = props;

  if (!currency) {
    return null;
  }

  const {
    centralBank, baseCurrency, baseCountry, baseCurrenciesArr,
  } = getTranslatedConfig(t);
  const tCBS = centralBank.slug;
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];
  const [tBCyS] = [
    String(baseCurrency.slug).toUpperCase(),
  ];
  const [tCS, tCN] = [String(currency.slug).toUpperCase(), String(currency.name).toLowerCase()];
  const allQuoteValid = allQuote && allQuote.length;
  const allQuoteNoCentral = (
    allQuoteValid
      ? _filter(allQuote, (q) => q.institutionVObj.slug !== config.centralBank.slug)
      : []
  );
  const centralQuote = _filter(
    allQuote,
    (q) => q.institutionVObj.slug === config.centralBank.slug,
  )[0];
  const bestBid = _maxBy(allQuoteNoCentral, 'bid');
  const bestAsk = _minBy(allQuoteNoCentral, 'ask');

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `${t('Curs valutar')} ${tCN} ${tCS}/${tBCyS} — ${tBCN} (${tBCS})`,
      description: (`
        #${t('curs')} #${tCS} #${t('cursvalutar')} #${tCN} 
        ✅ ${t('Cursul valutar pentru {{tCN}} ({{tCS}}) afişat azi la băncile din {{tBCN}}', { tCN, tCS, tBCN })}.
      `),
    }}>
      <Page
        heading={`(${tBCS}) ${tBCN}: ${t('Curs valutar').toLowerCase()} ${tCN}`}
        breadcrumb={[
          { href: '/', label: t('Curs valutar') },
          { href: '/currencies', label: t('Lista valute') },
          { href: null, label: `${currency.name} (${tCS})` },
        ]}
      >
        {
          centralQuote && (
            <div className="page-lead" style={{ marginBottom: '3rem' }}>
              <CurrencyTop
                currency={currency}
                centralQuote={centralQuote}
                bestBid={bestBid}
                bestAsk={bestAsk}
                trans={{ tCBS, tCN, tBCN }}
                {... {
                  centralBank, baseCurrency, baseCountry, baseCurrenciesArr,
                } }
              />
            </div>
          )
        }

        <h2
          style={{
            marginBottom: '1.19rem',
            fontSize: '1.4rem',
            lineHeight: '1.3',
            opacity: '0.8',
          }}
          dangerouslySetInnerHTML={{
            __html: t('Convertor valutar după cursul {{tCBS}} valabil astăzi', { tCBS }),
          }}
        />

        <div className="page-lead" style={{ marginTop: '1rem' }}>
          <ConverterWidget
            centralQuote={allCentralQuote}
            defaultAsk={query.slug}
            {... {
              centralBank, baseCurrency, baseCountry, baseCurrenciesArr,
            } }
          />
        </div>

        <section style={{ marginTop: '3rem' }}>
          <h2
            style={{
              marginBottom: '1.19rem',
              fontSize: '1.4rem',
              lineHeight: '1.3',
              opacity: '0.8',
            }}
            dangerouslySetInnerHTML={{
              __html: t('Curs {{tCN}} ({{tCS}}) afişat azi la bănci', { tCN, tCS }),
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
                              info={t('cumpără')}
                            />
                          </div>
                          <div className="flex__item-grow">
                            <RateCard
                              key="ask"
                              value={quote.ask}
                              info={t('vinde')}
                            />
                          </div>
                        </div>
                      </QuoteCard>
                    ))
                  }
                </div>
              </>
            ) : <p>{t('Nu a fost găsit niciun rezultat')}.</p>
          }
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2
            style={{
              marginBottom: '1.19rem',
              fontSize: '1.4rem',
              lineHeight: '1.3',
              opacity: '0.8',
            }}
            dangerouslySetInnerHTML={{
              __html: t(
                'Evoluție curs valutar oficial pentru {{tCN}}, ({{tCS}}/{{tBCyS}})',
                { tCN, tCS, tBCyS },
              ),
            }}
          />

          {
            /*
            Evoluția cursului oficial pentru 1 Dolar american, USD/MDL
            Utilizați graficul evoluției și urmăriți dinamica dolarului american (USD),
            în diferite perioade de timp: pe săptămână, lună, an, zi.
            */
          }

          {
            archiveQuote.map((currencyItem) => (
              <Chart key={currencyItem.slug}
                     id={currencyItem.slug}
                     data={currencyItem.quote}
                     lng={lng}
              />
            ))
          }
        </section>

        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}
            />
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
  const lng = req ? req.lng : i18n.language;
  const fullPath = req ? `/${lng}${asPath}` : asPath;

  return {
    lng,
    query,
    fullPath,
  };
};

// i18n.
const CurrencyPageI18N = withTranslation()(CurrencyPageMarkup);

// Container.
const GQL_CURRENCY_PAGE = gql`
  query CurrencyPage ($slug: String!, $where: QuoteWhereInput, $archiveWhere: QuoteArchiveWhereInput, $date: String, $currencies: [String!], $includeBanks: [String!], $postSlug: String) {
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
    archiveQuote(where: $archiveWhere) {
      slug
      quote {
        bid
        date
      }
    }
    allCentralQuote: bestQuote(date: $date, currencies: $currencies, includeBanks: $includeBanks) {
      currencyVObj {
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
          archiveWhere: {
            date: [xDaysAgo(90), today()],
            currencies: [query.slug],
            includeBanks: [config.centralBank.slug],
          },
          date: today(),
          currencies: config.baseCurrenciesArr,
          includeBanks: [config.centralBank.slug],
          postSlug: fullPath,
        },
      }),
      props: ({
        data: {
          currency, allQuote, archiveQuote, allCentralQuote, post,
        },
      }) => ({
        currency,
        allQuote,
        archiveQuote,
        allCentralQuote,
        post,
      }),
    },
  ),
)(CurrencyPageI18N);
