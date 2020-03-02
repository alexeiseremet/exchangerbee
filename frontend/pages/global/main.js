import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { host, countries } from '../../server.config';
import { i18n, withTranslation } from '../../lib/i18n';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import Tabs from '../../features/Tabs';
import ConverterWidget from '../../features/ConverterWidget';

const MainPageMarkup = ({ widgets, post, fullPath }) => {
  if (!post) {
    return null;
  }

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: 'xezoom.com',
      description: '✅ Cel mai bun curs valutar oferit de băncile din Moldova, România, Rusia și Ucraina.',
    }}>
      <Page heading="xezoom.com">
        <h2
          style={{
            marginBottom: '1.19rem',
            marginTop: '3rem',
            fontSize: '1.6rem',
            lineHeight: '1.3',
            opacity: '0.8',
          }}
          dangerouslySetInnerHTML={{ __html: 'Convertor valutar' }}
        />

        <Tabs
          activeIndex={0}
          items={
            countries.map((country) => ({
              id: country.slug,
              label: country.name,
              content: (
                <ConverterWidget {...widgets[country.slug]} />
              ),
            }))
          }
        />

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
MainPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const lng = req ? req.lng : i18n.lng;
  const fullPath = req ? `/${lng}` : asPath;
  const fetchWidgets = await fetch(`${host}/widgets/?lng=${lng}`);
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
const GQL_GLOBAL_MAIN_PAGE = gql`
  query GlobalMainPage ($postSlug: String) {
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_GLOBAL_MAIN_PAGE,
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
