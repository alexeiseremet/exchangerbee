import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import excludeKeys from '../../lib/excludeKeys';
import FormMarkup from './_formMarkup';

const UpdateCurrencyForm = ({ onSubmit, currency }) => (
  <FormMarkup
    action="update"
    onSubmit={onSubmit}
    currency={currency}
  />
);

const GQL_UPDATE_CURRENCY = gql`
  mutation UpdateCurrency ($id: ID!, $currency: CurrencyInput!) {
    updateCurrency(id: $id, currency: $currency) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_UPDATE_CURRENCY,
    {
      props: ({ mutate, ownProps: { currency } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting },
        ) => {
          mutate({
            variables: {
              id: currency.id,
              currency: excludeKeys(formValues, ['id', 'slug', '__typename']),
            },
          })
            .then(({ data: { updateCurrency } }) => {
              // eslint-disable-next-line no-console
              console.dir(updateCurrency);
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
)(UpdateCurrencyForm);
