import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

const DeletePostButton = ({ onSubmit }) => (
  <button onClick={(elem) => onSubmit(elem)}>Delete</button>
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

          // eslint-disable-next-line no-alert
          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: post.id,
              },
            })
              .then(({ data: { deletePost } }) => {
                // eslint-disable-next-line no-console
                console.dir(deletePost);
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
              });
          }
        },
      }),
      options: {
        refetchQueries: [
          'AllPost',
        ],
      },
    },
  ),
)(DeletePostButton);
