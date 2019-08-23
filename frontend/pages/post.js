import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withTranslation } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdatePost, DeletePost } from '../features/Post'

const PostPageMarkup = ({ query: { action }, post }) => {
  if (!post) {
    return null
  }

  const { id, title } = post;

  return (
    <Layout>
      <Metadata
        title={t.metaTitle}
        description={t.metaDescription}
        ogTitle={t.ogTitle}
        ogDescription={t.ogDescription}
      />
      <Page>
        {
          !action && (
            <React.Fragment>
              <Link href={`/post?id=${id}&action=update`} as={`/posts/${id}/update`}>
                <a>{'Update'}</a>
              </Link>
              &nbsp;|&nbsp;
              <DeletePost post={post} />
              <hr />

              <h1>{title}</h1>
            </React.Fragment>
          )
        }

        {action && <UpdatePost post={post} />}
      </Page>
    </Layout>
  )
};

// getInitialProps.
PostPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const PostPageI18N = withTranslation('common')(PostPageMarkup);

// Container.
const GQL_POST = gql`
  query Post ($id: ID!) {
    post(id: $id) {
      id
      slug
      title
    }
  }
`;

export default _compose(
  graphql(
    GQL_POST,
    {
      options: ({ query }) => ({
        variables: {
          id: query.id,
        },
      }),
      props: ({ data: { post } }) => ({
        post
      }),
    }
  )
)(PostPageI18N)
