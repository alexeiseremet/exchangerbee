import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import _omit from 'lodash/omit'

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

const excludeKeys = obj => (
  _omit(obj, ['id', 'slug', '__typename'])
)

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
              currency: excludeKeys(formValues),
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
