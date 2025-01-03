import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { UpdatePost, DeletePost } from '../../features/Post';

const PostPageMarkup = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <Layout metadata={{ title: post.slug }} type="admin">
      <Page>
        <DeletePost post={post} />
        <hr/>
        <UpdatePost post={post} />
      </Page>
    </Layout>
  );
};

// getInitialProps.
PostPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const PostPageI18N = withTranslation()(PostPageMarkup);

// Container.
const GQL_POST = gql`
  query Post ($id: ID!) {
    post(id: $id) {
      id
      slug
      title
      description
      heading
      textFirst
      textSecond
    }
  }
`;

const PostPageGQL = _compose(
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

export default securePage(PostPageGQL);
