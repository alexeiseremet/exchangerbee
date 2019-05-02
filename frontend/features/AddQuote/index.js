import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import moment from 'moment'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddQuoteMarkup = ({onSubmit, quote = null, action}) => (
  <Fragment>
    <div className="text">
      <h1>{action} {t.quote}</h1>
    </div>

    <Form
      initialValues={{
        institution: '',
        date: moment(new Date()).format('YYYY-MM-DDThh:mm'),
        amount: '1',
        period: 'daily',
        currency: '',
        ask: '',
        bid: '',
        ...quote
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="amount"
        id="quote-amount"
        type="text"
        labelText="Amount"
        required
      />
      <Input
        name="currency"
        id="quote-currency"
        type="text"
        labelText="Quote currency"
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
      <Input
        name="date"
        id="quote-date"
        type="datetime-local"
        labelText="Updated at"
        required
      />
      <Input
        name="institution"
        id="quote-institution"
        type="text"
        labelText="Institution"
        required
        readOnly={action === 'update'}
      />
    </Form>
  </Fragment>
)

// Container.
const GQL_CREATE_QUOTE = gql`
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      institution
      currency
      updatedAt
    }
  }
`

// Container.
const GQL_UDATE_QUOTE = gql`
  mutation CreateQuote ($id: ID!, $quote: QuoteInput!) {
    updateQuote(id: $id, quote: $quote) {
      institution
      currency
      updatedAt
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
