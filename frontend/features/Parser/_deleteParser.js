import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const DeleteParserButton = ({onSubmit}) => (
  <a href="#" onClick={(elem) => onSubmit(elem)}>Delete</a>
)

const GQL_DELETE_PARSER = gql`
  mutation DeleteParser ($id: ID!) {
    deleteParser(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(
    GQL_DELETE_PARSER,
    {
      props: ({mutate, ownProps: {parser}}) => ({
        onSubmit: (elem) => {
          elem.preventDefault()

          if (window.confirm('Do you really want to detele?')) {
            mutate({
              variables: {
                id: parser.id,
              }
            })
              .then(({data: {deteleParser}}) => {
                console.dir(deteleParser)
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
