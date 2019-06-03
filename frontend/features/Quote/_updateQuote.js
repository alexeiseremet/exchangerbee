import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import excludeKeys from '../../lib/excludeKeys'
import FormMarkup from './_formMarkup'

const UpdateQuoteForm = ({onSubmit, quote}) => (
  <FormMarkup
    action={'update'}
    onSubmit={onSubmit}
    quote={quote}
  />
)

const GQL_UPDATE_QUOTE = gql`
  mutation UpdateQuote ($id: ID!, $quote: QuoteInput!) {
    updateQuote(id: $id, quote: $quote) {
      id
    }
  }
`

export default compose(
  graphql(
    GQL_UPDATE_QUOTE,
    {
      props: ({mutate, ownProps: {quote}}) => ({
        onSubmit: (
          // form values & actions
          formValues,
          {setStatus, setSubmitting}
        ) => {
          mutate({
            variables: {
              id: quote.id,
              quote: excludeKeys(formValues, ['id', '__typename']),
            }
          })
            .then(({data: {updateQuote}}) => {
              console.dir(updateQuote)
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
)(UpdateQuoteForm)
