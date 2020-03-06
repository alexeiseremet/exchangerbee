import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import {
  baseCountry, baseCurrency, baseCurrenciesArr, centralBank,
} from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import ConverterWidget from '../features/ConverterWidget';

const ConverterPageMarkup = ({
  centralQuote, post, fullPath,
}) => (
  <Layout metadata={{
    url: `${fullPath}`,
    title: `Convertor valutar ${String(centralBank.slug).toUpperCase()} — ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()})`,
    description: `✅ Convertorul valutar după cursul de schimb anunțat de ${centralBank.name} pentru astăzi.`,
  }}>
    <Page heading={`Convertor valutar după cursul ${String(centralBank.slug).toUpperCase()}`}>
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
           __html: `Convertorul valutar de mai sus face conversia folosind cursul de schimb
           anunțat de ${centralBank.name} (${String(centralBank.slug).toUpperCase()}) pentru azi
           şi îl poți folosi atunci când vrei să calculezi suma obținută în urma schimbului valutar 
           la cursul băncii centrale.
           `,
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

// getInitialProps.
ConverterPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    fullPath,
  };
};

// i18n.
const ConverterPageI18N = withTranslation('common')(ConverterPageMarkup);

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
          currencies: baseCurrenciesArr,
          includeBanks: [centralBank.slug],
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
