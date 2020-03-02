import '../../features/BestQuotes/styles.scss';
import '../../features/QuoteCard/styles.scss';
import '../../features/RateCard/styles.scss';

import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { host } from '../../server.config';
import { i18n, withTranslation } from '../../lib/i18n';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import BestQuotes from '../../features/BestQuotes';
import Today from '../../features/Today';

const CountryPageMarkup = ({ widgets, post, query, fullPath }) => {
  if (!post) {
    return null;
  }

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: post.title,
      description: post.description, //'✅ Curs de schimb valutar la băncile din Moldova.',
    }}>
      <Page heading={post.title}>
        <BestQuotes centralQuote={widgets[query.slug]['centralQuote']} />

        <div style={{ marginTop: '3rem' }}>
          <Today archiveQuote={widgets[query.slug]['archiveQuote']} />
        </div>

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
  )
};

// getInitialProps.
CountryPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const lng = req ? req.lng : i18n.lng;
  const fullPath = req ? `/${lng}${asPath}` : asPath;
  const fetchWidgets = await fetch(`${host}/widgets/?lng=${lng}`);
  const widgets = await fetchWidgets.json();

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
    widgets,
  };
};

// i18n.
const CountryPageI18N = withTranslation('common')(CountryPageMarkup);

// Container.
const GQL_GLOBAL_COUNTRY_PAGE = gql`
  query GlobalCountryPage ($postSlug: String) {
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_GLOBAL_COUNTRY_PAGE,
    {
      options: ({ fullPath }) => ({
        variables: {
          postSlug: fullPath,
        },
      }),
      props: ({
        data: {
          post,
        },
      }) => ({
        post,
      }),
    },
  ),
)(CountryPageI18N);
