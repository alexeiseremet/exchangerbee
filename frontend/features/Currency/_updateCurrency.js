import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import excludeKeys from '../../lib/excludeKeys'
import FormMarkup from './_formMarkup'

const UpdateCurrencyForm = ({onSubmit, currency}) => (
  <FormMarkup
    action={'update'}
    onSubmit={onSubmit}
    currency={currency}
  />
)

const GQL_UPDATE_CURRENCY = gql`
  mutation UpdateCurrency ($id: ID!, $currency: CurrencyInput!) {
    updateCurrency(id: $id, currency: $currency) {
      slug
      name
    }
  }
`

export default compose(
  graphql(
    GQL_UPDATE_CURRENCY,
    {
      props: ({mutate, ownProps: {currency}}) => ({
        onSubmit: (
          // form values & actions
          formValues,
          {setStatus, setSubmitting}
        ) => {
          mutate({
            variables: {
              id: currency.id,
              currency: excludeKeys(formValues, ['id', 'slug', '__typename']),
            }
          })
            .then(({data: {updateCurrency}}) => {
              console.dir(updateCurrency)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      }),
      options: {
        refetchQueries: [
          'AllCurrency',
        ],
      },
    }
  )
)(UpdateCurrencyForm)
