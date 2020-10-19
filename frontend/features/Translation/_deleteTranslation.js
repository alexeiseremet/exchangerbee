import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

const DeleteTranslationButton = ({ onSubmit }) => (
  <button onClick={onSubmit}>Delete</button>
);

const GQL_DELETE_TRANSLATION = gql`
  mutation DeleteTranslation ($id: ID!) {
    deleteTranslation(id: $id) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_DELETE_TRANSLATION,
    {
      props: ({ mutate, ownProps: { translation } }) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          // eslint-disable-next-line no-alert
          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: translation.id,
              },
            })
              .then(({ data: { deleteTranslation } }) => {
                // eslint-disable-next-line no-console
                console.dir(deleteTranslation);
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
          'AllTranslation',
        ],
      },
    },
  ),
)(DeleteTranslationButton);
