import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import List from '../features/List';
import { CreatePost } from '../features/Post';

const PostsPageMarkup = ({ query: { action }, allPost }) => (
  <Layout>
    <Page>
      {
        action
          ? <CreatePost />
          : (
            <>
              <Link href="/posts?action=create" as="/posts/create">
                <a>Create</a>
              </Link>
              <hr/>

              {
                allPost && allPost.length && (
                  <List type="ordered">
                    {
                      allPost.map(({ id, slug }) => (
                        <li key={id}>
                          <Link href={`/post?id=${id}`} as={`/posts/${id}`}>
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

export default _compose(
  graphql(
    GQL_ALL_POST,
    {
      props: ({ data: { allPost } }) => ({
        allPost,
      }),
    },
  ),
)(PostsPageI18N);
