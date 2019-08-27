import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

const IndexPageMarkup = ({ post }) => (
    <Layout>
      <Metadata
        title={t.metaTitle}
        description={t.metaDescription}
        ogTitle={t.ogTitle}
        ogDescription={t.ogDescription}
      />

      <Page>
        {post && (
          <React.Fragment>
            <h1 style={{ marginBottom: '10px', fontSize: '18px' }}>
              {post.title}
            </h1>

            <p dangerouslySetInnerHTML={{ __html: post.textFirst }}/>

            <p dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
          </React.Fragment>
        )}
      </Page>
    </Layout>

);

// getInitialProps.
IndexPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}` : asPath;

  return {
    namespacesRequired: ['common'],
    fullPath,
  }
};

// i18n.
const IndexPageI18N = withTranslation('common')(IndexPageMarkup);

// Container.
const GQL_CURRENCY = gql`
  query IndexPage ($postSlug: String!) {
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_CURRENCY,
    {
      options: ({ fullPath }) => ({
        variables: {
          postSlug: fullPath,
        },
      }),
      props: ({ data: { post } }) => ({
        post,
      }),
    }
  )
)(IndexPageI18N)
