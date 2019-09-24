import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

const DeleteQuoteButton = ({ onSubmit }) => (
  <button onClick={onSubmit}>Delete</button>
);

const GQL_DELETE_QUOTE = gql`
  mutation DeleteQuote ($id: ID!) {
    deleteQuote(id: $id) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_DELETE_QUOTE,
    {
      props: ({ mutate, ownProps: { quote } }) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          // eslint-disable-next-line no-alert
          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: quote.id,
              },
            })
              .then(({ data: { deleteQuote } }) => {
                // eslint-disable-next-line no-console
                console.dir(deleteQuote);
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
              });
          }
        },
      }),
      options: {
        refetchQueries: [
          'AllQuote',
        ],
      },
    },
  ),
)(DeleteQuoteButton);
