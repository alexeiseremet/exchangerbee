import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import config, { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import ConverterWidget from '../features/ConverterWidget';

const ConverterPageMarkup = (props) => {
  const {
    t, centralQuote, post, fullPath,
  } = props;
  const {
    baseCountry, baseCurrency, baseCurrenciesArr, centralBank,
  } = getTranslatedConfig(t);
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];
  const [tCBN, tCBS] = [centralBank.name, centralBank.slug];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `${t('Convertor valutar')} ${tCBS} — ${tBCN} (${tBCS})`,
      description: (`
        ${tCBS} ✅ ${tBCN}
        ${t('Convertorul valutar după cursul de schimb anunțat de {{tCBN}} pentru astăzi', { tCBN })}.
      `),
    }}>
      <Page
        heading={`(${tBCS}) ${tBCN}: ${t('Convertor valutar').toLowerCase()} ${tCBS}`}
        breadcrumb={[
          { href: '/', label: t('Curs valutar') },
          { href: null, label: t('Convertor valutar') },
        ]}
      >
        <div className="page-lead">
          <ConverterWidget
            centralQuote={centralQuote}
            {... {
              baseCountry, baseCurrency, baseCurrenciesArr, centralBank,
            }}
          />
        </div>

        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}
           dangerouslySetInnerHTML={{
             __html: t(`Convertorul valutar de mai sus face conversia folosind cursul de schimb
             anunțat de {{tCBN}} ({{tCBS}}) pentru azi şi îl poți folosi atunci când vrei
             să calculezi suma obținută în urma schimbului valutar la cursul băncii centrale.
             `, { tCBN, tCBS }),
           }}
        />

        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
          )
        }

        {
          post && post.textSecond && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
          )
        }
      </Page>
    </Layout>
  );
};

// getInitialProps.
ConverterPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    fullPath,
  };
};

// i18n.
const ConverterPageI18N = withTranslation()(ConverterPageMarkup);

// Container.
const GQL_CONVERTER_PAGE = gql`
  query ConverterPage ($date: String, $currencies: [String!], $includeBanks: [String!], $postSlug: String!) {
    centralQuote: bestQuote(date: $date, currencies: $currencies, includeBanks: $includeBanks) {
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
    GQL_CONVERTER_PAGE,
    {
      options: ({ fullPath }) => ({
        variables: {
          date: today(),
          currencies: config.baseCurrenciesArr,
          includeBanks: [config.centralBank.slug],
          postSlug: fullPath,
        },
      }),
      props: ({ data: { centralQuote, post } }) => ({
        centralQuote,
        post,
      }),
    },
  ),
)(ConverterPageI18N);
