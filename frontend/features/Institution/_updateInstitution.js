import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import excludeKeys from '../../lib/excludeKeys'

import FormMarkup from './_formMarkup'

const UpdateInstitutionForm = ({ onSubmit, institution }) => (
  <FormMarkup
    action={'update'}
    onSubmit={onSubmit}
    institution={institution}
  />
);

const GQL_UPDATE_INSTITUTION = gql`
  mutation UpdateInstitution ($id: ID!, $institution: InstitutionInput!) {
    updateInstitution(id: $id, institution: $institution) {
      id
    }
  }
`;

export default compose(
  graphql(
    GQL_UPDATE_INSTITUTION,
    {
      props: ({ mutate, ownProps: { institution } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting }
        ) => {
          mutate({
            variables: {
              id: institution.id,
              institution: excludeKeys(formValues, ['id', 'slug', '__typename']),
            }
          })
          .then(({ data: { updateInstitution } }) => {
            console.dir(updateInstitution)
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
          'AllInstitution',
        ],
      },
    }
  )
)(UpdateInstitutionForm)
