import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddQuoteMarkup = ({mutate}) => (
  <Fragment>
    <div className="text">
      <h1>{t.quote}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        numCode: '',
        symbol: '',
      }}
      onSubmit={quote => {
        mutate({
          variables: {quote}
        })
      }}
    >
      <Input
        name="country"
        id="quote-country"
        type="text"
        labelText="Country"
        required
      />
      <Input
        name="institution"
        id="quote-institution"
        type="text"
        labelText="Institution"
        required
      />
      <Input
        name="date"
        id="quote-date"
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
        name="updateDate"
        id="quote-update-date"
        type="text"
        labelText="Update Date"
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

const GQL_CREATE_QUOTE = gql`
  mutation CreateQuote ($quote: QuoteInput!) {
    createQuote(quote: $quote) {
      slug,
      numCode
    }
  }
`

export default graphql(
  GQL_CREATE_QUOTE
)(AddQuoteMarkup)
