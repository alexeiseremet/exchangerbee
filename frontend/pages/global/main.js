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

const countries = ['md', 'ro', 'ru', 'ua'];

const MainPageMarkup = ({ widgets, post, fullPath }) => (
  <Layout metadata={{
    url: `${fullPath}`,
    title: 'xezoom.com',
    description: '✅ Cel mai bun curs valutar oferit de băncile din Moldova, Romania, Rusia și Ucraina.',
  }}>
    <Page heading="xezoom.com">
      {
        countries.map(country => (
          <section key={country} style={{ marginTop: '3rem' }}>
            <div dangerouslySetInnerHTML={{ __html: widgets[country] }} />
          </section>
        ))
      }

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

// getInitialProps.
MainPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const lng = req ? req.lng : i18n.lng;
  const fullPath = req ? `/${lng}${asPath}` : asPath;
  const fetchWidgets = await fetch(`${host}/jsonwidget/?lng=${lng}`);
  const widgets = await fetchWidgets.json();

  return {
    namespacesRequired: ['common'],
    fullPath,
    widgets,
  };
};

// i18n.
const MainPageI18N = withTranslation('common')(MainPageMarkup);

// Container.
const GQL_MAIN_PAGE = gql`
  query MainPage ($postSlug: String) {
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_MAIN_PAGE,
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
)(MainPageI18N);
