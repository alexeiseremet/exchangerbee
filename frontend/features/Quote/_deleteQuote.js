import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const DeleteQuoteButton = ({onSubmit}) => (
  <a href="#" onClick={(elem) => onSubmit(elem)}>Delete</a>
)

const GQL_DELETE_QUOTE = gql`
  mutation DeleteQuote ($id: ID!) {
    deleteQuote(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(
    GQL_DELETE_QUOTE,
    {
      props: ({mutate, ownProps: {quote}}) => ({
        onSubmit: (elem) => {
          elem.preventDefault()

          if (window.confirm('Do you really want to detele?')) {
            mutate({
              variables: {
                id: quote.id,
              }
            })
              .then(({data: {deteleQuote}}) => {
                console.dir(deteleQuote)
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      }),
      options: {
        refetchQueries: [
          'AllQuote',
        ],
      },
    }
  )
)(DeleteQuoteButton)
