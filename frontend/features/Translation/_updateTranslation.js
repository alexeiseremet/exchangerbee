import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import excludeKeys from '../../lib/excludeKeys';
import FormMarkup from './_formMarkup';

const UpdateTranslationForm = ({ onSubmit, translation }) => (
  <FormMarkup action="update" onSubmit={onSubmit} translation={excludeKeys(translation, ['id', '__typename'])} />
);

const GQL_UPDATE_TRANSLATION = gql`
  mutation UpdateTranslation ($where: TranslationWhereInput!, $translation: TranslationInput!) {
    updateTranslation(where: $where, translation: $translation) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_UPDATE_TRANSLATION,
    {
      props: ({ mutate, ownProps: { translation } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting },
        ) => {
          const { locale, model } = translation;
          const whereQuote = { locale, model };

          mutate({
            variables: {
              where: excludeKeys(whereQuote, ['id', '__typename']),
              translation: excludeKeys(formValues, ['id', '__typename']),
            },
          })
            .then(({ data: { updateTranslation } }) => {
              // eslint-disable-next-line no-console
              console.dir(updateTranslation);
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
          'AllTranslation',
        ],
      },
    },
  ),
)(UpdateTranslationForm);
