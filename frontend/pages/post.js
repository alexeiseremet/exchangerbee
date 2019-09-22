import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import { UpdatePost, DeletePost } from '../features/Post';

const PostPageMarkup = ({ query: { action }, post }) => {
  if (!post) {
    return null;
  }

  const {
    id, title, textFirst, textSecond,
  } = post;

  return (
    <Layout metadata={{ title: 'Post' }}>
      <Page>
        {
          action
            ? <UpdatePost post={post} />
            : (
              <>
                <Link href={`/post?id=${id}&action=update`} as={`/posts/${id}/update`}>
                  <a>Update</a>
                </Link>
                &nbsp;|&nbsp;
                <DeletePost post={post} />
                <hr />

                <h1 style={{ marginBottom: '10px', fontSize: '18px' }}>{title}</h1>
                <p
                  dangerouslySetInnerHTML={{ __html: textFirst }}
                  style={{ marginBottom: '10px' }}
                />
                <p
                  dangerouslySetInnerHTML={{ __html: textSecond }}
                  style={{ marginBottom: '10px' }}
                />
              </>
            )
        }
      </Page>
    </Layout>
  );
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
      textFirst
      textSecond
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
        post,
      }),
    },
  ),
)(PostPageI18N);
