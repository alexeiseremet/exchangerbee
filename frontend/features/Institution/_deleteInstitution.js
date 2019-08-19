import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

const DeleteInstitutionButton = ({onSubmit}) => (
  <a href="#" onClick={(elem) => onSubmit(elem)}>Delete</a>
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
      props: ({mutate, ownProps: {institution}}) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: institution.id,
              }
            })
              .then(({data: {deleteInstitution}}) => {
                console.dir(deleteInstitution)
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      }),
      options: {
        refetchQueries: [
          'AllInstitution',
        ],
      },
    }
  )
)(DeleteInstitutionButton)
