import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

const DeletePostButton = ({ onSubmit }) => (
  <a href="#" onClick={(elem) => onSubmit(elem)}>Delete</a>
);

const GQL_DELETE_POST = gql`
  mutation DeletePost ($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_DELETE_POST,
    {
      props: ({ mutate, ownProps: { post } }) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: post.id,
              }
            })
              .then(({ data: { deletePost } }) => {
                console.dir(deletePost)
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      }),
      options: {
        refetchQueries: [
          'AllPost',
        ],
      },
    }
  )
)(DeletePostButton)
