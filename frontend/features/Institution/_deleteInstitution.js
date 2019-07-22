import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

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

export default compose(
  graphql(
    GQL_DELETE_INSTITUTION,
    {
      props: ({mutate, ownProps: {institution}}) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          if (window.confirm('Do you really want to detele?')) {
            mutate({
              variables: {
                id: institution.id,
              }
            })
              .then(({data: {deteleInstitution}}) => {
                console.dir(deteleInstitution)
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
