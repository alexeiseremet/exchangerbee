import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

const DeleteParserButton = ({ onSubmit }) => (
  <button onClick={(elem) => onSubmit(elem)}>Delete</button>
);

const GQL_DELETE_PARSER = gql`
  mutation DeleteParser ($id: ID!) {
    deleteParser(id: $id) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_DELETE_PARSER,
    {
      props: ({ mutate, ownProps: { parser } }) => ({
        onSubmit: (elem) => {
          elem.preventDefault();

          // eslint-disable-next-line no-alert
          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: parser.id,
              },
            })
              .then(({ data: { deleteParser } }) => {
                // eslint-disable-next-line no-console
                console.dir(deleteParser);
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
          'AllParser',
        ],
      },
    },
  ),
)(DeleteParserButton);
