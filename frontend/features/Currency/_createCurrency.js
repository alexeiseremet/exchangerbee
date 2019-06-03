import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import FormMarkup from './_formMarkup'

const CreateCurrencyForm = ({onSubmit}) => (
  <FormMarkup action={'create'} onSubmit={onSubmit}/>
)

const GQL_CREATE_CURRENCY = gql`
  mutation CreateCurrency ($currency: CurrencyInput!) {
    createCurrency(currency: $currency) {
      id
    }
  }
`

export default compose(
  graphql(
    GQL_CREATE_CURRENCY,
    {
      props: ({mutate}) => ({
        onSubmit: (
          // form values & actions
          formValues,
          {setStatus, setSubmitting, resetForm}
        ) => {
          mutate({
            variables: {currency: formValues}
          })
            .then(({data: {createCurrency}}) => {
              resetForm()
              console.dir(createCurrency)
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
)(CreateCurrencyForm)
