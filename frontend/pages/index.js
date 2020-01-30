import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import {
  centralBank, baseCurrenciesArr, baseCountry, baseCurrency,
} from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today, xDaysAgo } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BestQuotes from '../features/BestQuotes';
import ConverterWidget from '../features/ConverterWidget';
import Chart from '../features/Chart';

const IndexPageMarkup = ({
  post, centralQuote, bestBidQuote, bestAskQuote, fullPath, archiveQuote,
}) => (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `Curs valutar ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()})`,
      description: `
        ✅ Cel mai bun curs valutar oferit de băncile din ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()}).
        ✅ Convertor valutar după cursul ${String(centralBank.slug).toUpperCase()} de azi.
      `,
    }}>
      <Page heading={`(${String(baseCountry.slug).toUpperCase()}) Curs valutar ${baseCountry.name}`}>
        <section style={{ marginBottom: '3rem' }}>
          <BestQuotes
            bestAskQuote={bestAskQuote}
            bestBidQuote={bestBidQuote}
            centralQuote={centralQuote}
          />
        </section>

        <h2
          style={{
            marginBottom: '1.19rem',
            fontSize: '1.6rem',
            lineHeight: '1.3',
            opacity: '0.8',
          }}
          dangerouslySetInnerHTML={{ __html: `Convertor rate după cursul valutar ${String(centralBank.slug).toUpperCase()}` }}
        />

        <div className="page-lead">
          <ConverterWidget />
        </div>


        {
          archiveQuote && archiveQuote.map((currency) => (
            <div style={{ marginTop: '3rem' }} key={currency.slug}>
              <h2
                style={{
                  marginBottom: '1.19rem',
                  fontSize: '1.6rem',
                  lineHeight: '1.3',
                  opacity: '0.8',
                }}
                dangerouslySetInnerHTML={{ __html: `${String(currency.slug).toUpperCase()}/${String(baseCurrency.slug).toUpperCase()} — evoluție curs valutar de referință` }}
              />

              <Chart data={currency.quote} id={currency.slug} count={12}/>
            </div>
          ))
        }

        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
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

// getInitialProps.
IndexPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}` : asPath;

  return {
    namespacesRequired: ['common'],
    fullPath,
  };
};

// i18n.
const IndexPageI18N = withTranslation('common')(IndexPageMarkup);

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
          currencies: baseCurrenciesArr,
          excludeBanks: [centralBank.slug],
          includeBanks: [centralBank.slug],
          archiveWhere: {
            date: [xDaysAgo(30), today()],
            currencies: baseCurrenciesArr,
            includeBanks: [centralBank.slug],
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
