import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import FormMarkup from './_formMarkup';

const CreateInstitutionForm = ({ onSubmit }) => (
  <FormMarkup action="create" onSubmit={onSubmit} />
);

const GQL_CREATE_INSTITUTION = gql`
  mutation CreateInstitution ($institution: InstitutionInput!) {
    createInstitution(institution: $institution) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_CREATE_INSTITUTION,
    {
      props: ({ mutate }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting, resetForm },
        ) => {
          mutate({
            variables: { institution: formValues },
          })
            .then(({ data: { createInstitution } }) => {
              resetForm();
              console.dir(createInstitution);
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
          'AllInstitution',
        ],
      },
    },
  ),
)(CreateInstitutionForm);
