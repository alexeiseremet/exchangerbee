import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import { Link, withNamespaces } from '../lib/i18n';
import { textIndexPage as t } from '../lib/locale';

import Metadata from '../features/Metadata';
import Layout from '../features/Layout';
import Page from '../features/Page';
import List from '../features/List';
import { CreatePost } from '../features/Post';

class PostsPageMarkup extends React.Component {
  static async getInitialProps({ query }) {
    return {
      namespacesRequired: ['common'],
      query
    }
  }

  render() {
    const { query: { action }, allPost } = this.props;

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
            !action && allPost && (
              <React.Fragment>
                <Link href={`/posts?action=create`} as={`/posts/create`} prefetch>
                  <a>{'Create'}</a>
                </Link>
                <hr />

                <List type="ordered">
                  {
                    allPost.map(({ id, slug }) => (
                      <li key={id}>
                        <Link href={`/post?id=${id}`} as={`/posts/${id}`} prefetch>
                          <a>{slug}</a>
                        </Link>
                      </li>
                    ))
                  }
                </List>
              </React.Fragment>
            )
          }

          {action && <CreatePost />}
        </Page>
      </Layout>
    )
  }
}

// i18n.
const PostsPageI18N = withNamespaces('common')(PostsPageMarkup);

// Container.
const GQL_ALL_POST = gql`
  query AllPost {
    allPost {
      id
      slug
      title
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_POST,
    {
      props: ({ data: { allPost } }) => ({
        allPost
      })
    }
  )
)(PostsPageI18N)
