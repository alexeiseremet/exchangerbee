import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import excludeKeys from '../../lib/excludeKeys';
import FormMarkup from './_formMarkup';

const UpdateQuoteForm = ({ onSubmit, quote }) => (
  <FormMarkup
    action="update"
    onSubmit={onSubmit}
    quote={quote}
  />
);

const GQL_UPDATE_QUOTE = gql`
  mutation UpdateQuote ($where: QuoteWhereInput!, $quote: QuoteInput!) {
    updateQuote(where: $where, quote: $quote) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_UPDATE_QUOTE,
    {
      props: ({ mutate, ownProps: { quote } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting },
        ) => {
          const { institution, currency, date } = quote;
          const whereQuote = { institution, currency, date };

          mutate({
            variables: {
              where: excludeKeys(whereQuote, ['id', '__typename']),
              quote: excludeKeys(
                formValues,
                ['id', '__typename', 'institutionVObj', 'currencyVObj'],
              ),
            },
          })
            .then(({ data: { updateQuote } }) => {
              // eslint-disable-next-line no-console
              console.dir(updateQuote);
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
)(UpdateQuoteForm);
