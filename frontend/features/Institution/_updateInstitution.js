import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';
import excludeKeys from '../../lib/excludeKeys';

import FormMarkup from './_formMarkup';

const UpdateInstitutionForm = ({ onSubmit, institution }) => (
  <FormMarkup
    action="update"
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

export default _compose(
  graphql(
    GQL_UPDATE_INSTITUTION,
    {
      props: ({ mutate, ownProps: { institution } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting },
        ) => {
          mutate({
            variables: {
              id: institution.id,
              institution: excludeKeys(formValues, ['id', 'slug', 'translationVObj', '__typename']),
            },
          })
            .then(({ data: { updateInstitution } }) => {
              // eslint-disable-next-line no-console
              console.dir(updateInstitution);
            })
            .catch((err) => {
              setStatus('error');
              setSubmitting(false);
              // eslint-disable-next-line no-console
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
)(UpdateInstitutionForm);
