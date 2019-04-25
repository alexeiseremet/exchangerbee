import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddQuoteMarkup = ({onSubmit}) => (
  <Fragment>
    <div className="text">
      <h1>{t.quote}</h1>
    </div>

    <Form
      initialValues={{
        institution: '',
        createdAt: '',
        currency: '',
        baseCurrency: '',
        amount: '',
        ask: '',
        bid: '',
        period: '',
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="institution"
        id="quote-institution"
        type="text"
        labelText="Institution"
        required
      />
      <Input
        name="createdAt"
        id="quote-createdAt"
        type="text"
        labelText="Numeric code"
        required
        readOnly
      />
      <Input
        name="currency"
        id="quote-currency"
        type="text"
        labelText="Quote currency"
        required
      />
      <Input
        name="baseCurrency"
        id="quote-base-currency"
        type="text"
        labelText="Base currency"
        required
      />
      <Input
        name="amount"
        id="quote-amount"
        type="text"
        labelText="Amount"
        required
      />
      <Input
        name="ask"
        id="quote-ask"
        type="text"
        labelText="Ask"
        required
      />
      <Input
        name="bid"
        id="quote-bid"
        type="text"
        labelText="Bid"
        required
      />
      <Input
        name="period"
        id="quote-period"
        type="text"
        labelText="Period"
        required
      />
    </Form>
  </Fragment>
)

// Container.
const GQL_CREATE_QUOTE = gql`
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      institution
      createdAt
      currency
    }
  }
`

export default compose(
  graphql(
    GQL_CREATE_QUOTE,
    {
      props: ({mutate}) => ({
        onSubmit: (
          quote,
          // form actions
          {
            setStatus,
            setSubmitting,
            resetForm
          }
        ) => {
          mutate({
            variables: {quote}
          })
            .then(({createQuote}) => {
              resetForm()
              console.log(createQuote)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      })
    }
  )
)(AddQuoteMarkup)
