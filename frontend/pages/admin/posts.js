import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import List from '../../features/List';
import { CreatePost } from '../../features/Post';

const PostsPageMarkup = ({ query: { action }, allPost }) => (
  <Layout metadata={{ title: 'Posts' }}>
    <Page type="admin">
      {
        action
          ? <CreatePost />
          : (
            <>
              <Link href="/admin/posts?action=create" as="/admin/posts/create">
                <a>Create</a>
              </Link>
              <hr/>

              {
                allPost && allPost.length && (
                  <List type="ordered">
                    {
                      allPost.map(({ id, slug }) => (
                        <li key={id}>
                          <Link href={`/admin/post?id=${id}`} as={`/admin/posts/${id}`}>
                            <a>{slug}</a>
                          </Link>
                        </li>
                      ))
                    }
                  </List>
                )
              }
            </>
          )
      }
    </Page>
  </Layout>
);

// getInitialProps.
PostsPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const PostsPageI18N = withTranslation('common')(PostsPageMarkup);

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

const PostsPageGQL = _compose(
  graphql(
    GQL_ALL_POST,
    {
      props: ({ data: { allPost } }) => ({
        allPost,
      }),
    },
  ),
)(PostsPageI18N);

export default securePage(PostsPageGQL);
