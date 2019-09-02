import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import FormMarkup from './_formMarkup';

const CreatePostForm = ({ onSubmit }) => (
  <FormMarkup action="create" onSubmit={onSubmit} />
);

const GQL_CREATE_POST = gql`
  mutation CreatePost ($post: PostInput!) {
    createPost(post: $post) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_CREATE_POST,
    {
      props: ({ mutate }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting, resetForm },
        ) => {
          mutate({
            variables: { post: formValues },
          })
            .then(({ data: { createPost } }) => {
              resetForm();
              console.dir(createPost);
            })
            .catch((err) => {
              setStatus('error');
              setSubmitting(false);
              console.error(err);
            });
        },
      }),
      options: {
        refetchQueries: [
          'AllPost',
        ],
      },
    },
  ),
)(CreatePostForm);
