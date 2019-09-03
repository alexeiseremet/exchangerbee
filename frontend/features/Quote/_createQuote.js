import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import FormMarkup from './_formMarkup';

const CreateQuoteForm = ({ onSubmit }) => (
  <FormMarkup action="create" onSubmit={onSubmit} />
);

const GQL_CREATE_QUOTE = gql`
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_CREATE_QUOTE,
    {
      props: ({ mutate }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting, resetForm },
        ) => {
          mutate({
            variables: { quote: formValues },
          })
            .then(({ data: { createQuote } }) => {
              resetForm();
              // eslint-disable-next-line no-console
              console.dir(createQuote);
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
          'AllQuote',
        ],
      },
    },
  ),
)(CreateQuoteForm);
