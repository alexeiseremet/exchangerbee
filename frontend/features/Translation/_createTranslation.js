import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import FormMarkup from './_formMarkup';

const CreateTranslationForm = ({ onSubmit, institution }) => (
  <FormMarkup action="create" onSubmit={onSubmit} institution={institution} />
);

const GQL_CREATE_TRANSLATION = gql`
  mutation CreateTranslation ($translation: TranslationInput!) {
    createTranslation(translation: $translation) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_CREATE_TRANSLATION,
    {
      props: ({ mutate }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting, resetForm },
        ) => {
          mutate({
            variables: { translation: formValues },
          })
            .then(({ data: { createTranslation } }) => {
              resetForm();
              // eslint-disable-next-line no-console
              console.dir(createTranslation);
            })
            .catch((err) => {
              setStatus('error');
              setSubmitting(false);
              // eslint-disable-next-line no-console
              console.error(err);
            });
        },
      }),
      options: {},
    },
  ),
)(CreateTranslationForm);
