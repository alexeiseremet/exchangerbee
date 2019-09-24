import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

const DeleteInstitutionButton = ({ onSubmit }) => (
  <button onClick={onSubmit}>Delete</button>
);

const GQL_DELETE_INSTITUTION = gql`
  mutation DeleteInstitution ($id: ID!) {
    deleteInstitution(id: $id) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_DELETE_INSTITUTION,
    {
      props: ({ mutate, ownProps: { institution } }) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          // eslint-disable-next-line no-alert
          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: institution.id,
              },
            })
              .then(({ data: { deleteInstitution } }) => {
                // eslint-disable-next-line no-console
                console.dir(deleteInstitution);
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
          'AllInstitution',
        ],
      },
    },
  ),
)(DeleteInstitutionButton);
