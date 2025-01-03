import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import FormMarkup from './_formMarkup';

const CreateCurrencyForm = ({ onSubmit }) => (
  <FormMarkup action="create" onSubmit={onSubmit} />
);

const GQL_CREATE_CURRENCY = gql`
  mutation CreateCurrency ($currency: CurrencyInput!) {
    createCurrency(currency: $currency) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_CREATE_CURRENCY,
    {
      props: ({ mutate }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting, resetForm },
        ) => {
          mutate({
            variables: { currency: formValues },
          })
            .then(({ data: { createCurrency } }) => {
              resetForm();
              // eslint-disable-next-line no-console
              console.dir(createCurrency);
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
          'AllCurrency',
        ],
      },
    },
  ),
)(CreateCurrencyForm);
