import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'
import excludeKeys from '../../lib/excludeKeys'

import FormMarkup from './_formMarkup'

const UpdatePostForm = ({ onSubmit, post }) => (
  <FormMarkup
    action={'update'}
    onSubmit={onSubmit}
    post={post}
  />
);

const GQL_UPDATE_POST = gql`
  mutation UpdatePost ($id: ID!, $post: PostInput!) {
    updatePost(id: $id, post: $post) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_UPDATE_POST,
    {
      props: ({ mutate, ownProps: { post } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting }
        ) => {
          mutate({
            variables: {
              id: post.id,
              post: excludeKeys(formValues, ['id', 'slug', '__typename']),
            }
          })
            .then(({ data: { updatePost } }) => {
              console.dir(updatePost)
            })
            .catch(err => {
              setStatus('error');
              setSubmitting(false);
              console.error(err)
            })
        }
      }),
      options: {
        refetchQueries: [
          'AllPost',
        ],
      },
    }
  )
)(UpdatePostForm)
