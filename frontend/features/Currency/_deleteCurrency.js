import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const DeleteCurrencyButton = ({onSubmit}) => (
  <a href="#" onClick={(elem) => onSubmit(elem)}>Delete</a>
)

const GQL_DELETE_CURRENCY = gql`
  mutation DeleteCurrency ($id: ID!) {
    deleteCurrency(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(
    GQL_DELETE_CURRENCY,
    {
      props: ({mutate, ownProps: {currency}}) => ({
        onSubmit: (elem) => {
          elem.preventDefault()

          if (window.confirm('Do you really want to detele?')) {
            mutate({
              variables: {
                id: currency.id,
              }
            })
              .then(({data: {deteleCurrency}}) => {
                console.dir(deteleCurrency)
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      }),
      options: {
        refetchQueries: [
          'AllCurrency',
        ],
      },
    }
  )
)(DeleteCurrencyButton)
