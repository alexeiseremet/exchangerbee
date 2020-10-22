import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import CurrencyCard from '../features/CurrencyCard';

const CurrenciesPageMarkup = (props) => {
  const { t, post, allCurrency, fullPath } = props;
  const { baseCountry } = getTranslatedConfig(t);
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: post && post.title ? post.title : `${t('Lista valute')} — ${tBCN} (${tBCS})`,
      description: post && post.description ? post.description : t('✅ Lista valutelor negociate la băncile din {{tBCN}}', { tBCN }),
    }}>
      <Page
        heading={post && post.heading ? post.heading : `(${tBCS}) ${tBCN}: ${t('Lista valute').toLowerCase()}`}
        breadcrumb={[
          { href: '/', label: t('Curs valutar') },
          { href: null, label: post && post.heading ? post.heading : t('Lista valute') },
        ]}
      >
        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
          )
        }

        {
          allCurrency && (
            <section className="currency-list">
              {
                allCurrency.map((c, i) => <CurrencyCard key={i} currency={c}/>)
              }
            </section>
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
CurrenciesPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    fullPath,
  };
};

// i18n.
const CurrenciesPageI18N = withTranslation()(CurrenciesPageMarkup);

// Container.
const GQL_ALL_CURRENCY = gql`
  query AllCurrency ($postSlug: String!) {
    allCurrency {
      slug
      name
    }
    post(slug: $postSlug) {
      title
      description
      heading
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      options: ({ fullPath }) => ({
        variables: {
          postSlug: fullPath,
        },
      }),
      props: ({ data: { allCurrency, post } }) => ({
        allCurrency,
        post,
      }),
    },
  ),
)(CurrenciesPageI18N);
