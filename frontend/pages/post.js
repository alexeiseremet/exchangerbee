import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'

import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import { UpdatePost, DeletePost } from '../features/Post'

class PostPageMarkup extends React.Component {
  static async getInitialProps({ query }) {
    return {
      namespacesRequired: ['common'],
      query,
    }
  }

  render() {
    const { query: { action }, post } = this.props;
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
                <Link href={`/post?id=${id}&action=update`} as={`/posts/${id}/update`} prefetch>
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
  }
}

// i18n.
const PostPageI18N = withNamespaces('common')(PostPageMarkup);

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
