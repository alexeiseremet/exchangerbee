import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { baseCountry, centralBank } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import ConverterWidget from '../features/ConverterWidget';

class ConverterPageMarkup extends React.Component {
  render() {
    const { post, fullPath } = this.props;

    return (
      <Layout metadata={{
        url: `${fullPath}`,
        title: `Convertor valutar ${String(centralBank.slug).toUpperCase()} — ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()})`,
        description: `✅ Convertor valutar după cursul ${String(centralBank.slug).toUpperCase()} de azi.`,
      }}>
        <Page heading={`Convertor valutar după cursul de schimb ${String(centralBank.slug).toUpperCase()} de azi`}>
          <div className="page-lead">
            <ConverterWidget />
          </div>

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
  }
}

// getInitialProps.
ConverterPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  };
};

// i18n.
const ConverterPageI18N = withTranslation('common')(ConverterPageMarkup);

// Container.
const GQL_CONVERTER_PAGE = gql`
  query ConverterPage ($postSlug: String!) {
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
          postSlug: fullPath,
        },
      }),
      props: ({ data: { post } }) => ({
        post,
      }),
    },
  ),
)(ConverterPageI18N);
