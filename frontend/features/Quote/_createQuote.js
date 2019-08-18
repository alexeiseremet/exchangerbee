import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import FormMarkup from './_formMarkup'

const CreateQuoteForm = ({onSubmit}) => (
  <FormMarkup action={'create'} onSubmit={onSubmit}/>
)

const GQL_CREATE_QUOTE = gql`
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_CREATE_QUOTE,
    {
      props: ({mutate}) => ({
        onSubmit: (
          // form values & actions
          formValues,
          {setStatus, setSubmitting, resetForm}
        ) => {
          mutate({
            variables: {quote: formValues}
          })
            .then(({data: {createQuote}}) => {
              resetForm()
              console.dir(createQuote)
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
          'AllQuote',
        ],
      },
    }
  )
)(CreateQuoteForm)
