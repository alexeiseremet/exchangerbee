import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import config, { getTranslatedConfig } from '../server.config';
import { i18n, withTranslation } from '../lib/i18n';
import { today, xDaysAgo } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BestQuotes from '../features/BestQuotes';
import ConverterWidget from '../features/ConverterWidget';
import Chart from '../features/Chart';
import Tabs from '../features/Tabs';

const IndexPageMarkup = (props) => {
  const {
    t, lng, post, centralQuote, bestBidQuote, bestAskQuote, fullPath, archiveQuote,
  } = props;
  const {
    baseCountry, centralBank, baseCurrency, baseCurrenciesArr,
  } = getTranslatedConfig(t);
  const tCBS = centralBank.slug;
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `(${tBCS}) ${t('Curs valutar')} — ${tBCN}`,
      description: (
        `${t('✅ Cel mai bun curs valutar oferit de băncile din {{tBCN}} ({{tBCS}})', { tBCN, tBCS })}. 
        ${t('Convertor valutar după cursul {{tCBS}} valabil astăzi', { tCBS })}.`
      ),
    }}>
      <Page heading={`(${tBCS}) ${tBCN}: ${t('Curs valutar').toLowerCase()}`}>
        <section style={{ marginBottom: '3rem' }}>
          <BestQuotes
            bestAskQuote={bestAskQuote}
            bestBidQuote={bestBidQuote}
            centralQuote={centralQuote}
            {... { baseCurrenciesArr }}
          />
        </section>

        <h2
          style={{
            marginBottom: '1.19rem',
            fontSize: '1.6rem',
            lineHeight: '1.3',
            opacity: '0.8',
          }}
          dangerouslySetInnerHTML={{
            __html: t('Calculator valutar după cursul de schimb {{tCBS}}', { tCBS }),
          }}
        />

        <div className="page-lead">
          <ConverterWidget
            centralQuote={centralQuote}
            {... { baseCurrency, baseCurrenciesArr }}
          />
        </div>

        {archiveQuote && (
          <>
            <h2
              style={{
                marginBottom: '1.19rem',
                marginTop: '3rem',
                fontSize: '1.6rem',
                lineHeight: '1.3',
                opacity: '0.8',
              }}
              dangerouslySetInnerHTML={{ __html: t('Evoluție curs valutar de referință') }}
            />

            <Tabs
              activeIndex={1}
              items={archiveQuote.map((currency) => ({
                id: currency.slug,
                label: `${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()}`,
                content: (
                  <Chart data={currency.quote} id={currency.slug} count={12} lng={lng} />
                ),
              }))}
            />
          </>
        )}

        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}
            />
          )
        }

        {
          post && post.textSecond && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textSecond }}
            />
          )
        }
      </Page>
    </Layout>
  );
};

// getInitialProps.
IndexPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const lng = req ? req.lng : i18n.language;
  const fullPath = req ? `/${lng}${asPath}` : asPath;

  return {
    lng,
    fullPath,
  };
};

// i18n.
const IndexPageI18N = withTranslation()(IndexPageMarkup);

// Container.
const GQL_INDEX_PAGE = gql`
  query IndexPage ($postSlug: String, $date: String, $currencies: [String!], $excludeBanks: [String!], $includeBanks: [String!], $archiveWhere: QuoteArchiveWhereInput) {
    centralQuote: bestQuote(date: $date, currencies: $currencies, includeBanks: $includeBanks) {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
        numCode
      }
      amount
      bid
      ask
    }
    bestBidQuote: bestQuote(date: $date, currencies: $currencies, excludeBanks: $excludeBanks) {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
        numCode
      }
      amount
      bid
      ask
    }
    bestAskQuote: bestQuote(date: $date, currencies: $currencies, excludeBanks: $excludeBanks, type: "ask") {
      institutionVObj {
        name
        slug
      }
      currencyVObj {
        name
        slug
        numCode
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
    GQL_INDEX_PAGE,
    {
      options: ({ fullPath }) => ({
        variables: {
          postSlug: fullPath,
          date: today(),
          currencies: config.baseCurrenciesArr,
          excludeBanks: [config.centralBank.slug],
          includeBanks: [config.centralBank.slug],
          archiveWhere: {
            date: [xDaysAgo(30), today()],
            currencies: config.baseCurrenciesArr,
            includeBanks: [config.centralBank.slug],
          },
        },
      }),
      props: ({
        data: {
          post, centralQuote, bestBidQuote, bestAskQuote, archiveQuote,
        },
      }) => ({
        post,
        centralQuote,
        bestBidQuote,
        bestAskQuote,
        archiveQuote,
      }),
    },
  ),
)(IndexPageI18N);
