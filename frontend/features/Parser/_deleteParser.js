import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

const DeleteParserButton = ({ onSubmit }) => (
  <a href="#" onClick={(elem) => onSubmit(elem)}>Delete</a>
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
          elem.preventDefault()

          if (window.confirm('Do you really want to delete?')) {
            mutate({
              variables: {
                id: parser.id,
              }
            })
              .then(({ data: { deleteParser } }) => {
                console.dir(deleteParser)
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      }),
      options: {
        refetchQueries: [
          'AllParser',
        ],
      },
    }
  )
)(DeleteParserButton)
