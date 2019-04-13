import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddCurrencyMarkup = ({mutate}) => (
  <Fragment>
    <div className="text">
      <h1>{t.currency}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        numCode: '',
        symbol: '',
      }}
      onSubmit={currency => {
        mutate({
          variables: {currency}
        })
      }}
    >
      <Input
        name="name"
        id="currency-name"
        type="text"
        labelText="Name"
        required
      />
      <Input
        name="slug"
        id="currency-slug"
        type="text"
        labelText="Slug"
        required
      />
      <Input
        name="numCode"
        id="currency-num-code"
        type="text"
        labelText="Numeric code"
        required
      />
      <Input
        name="symbol"
        id="currency-symbol"
        type="text"
        labelText="Symbol"
      />
    </Form>
  </Fragment>
)

const GQL_CREATE_CURRENCY = gql`
  mutation CreateCurrency ($currency: CurrencyInput!) {
    createCurrency(currency: $currency) {
      slug,
      numCode
    }
  }
`

export default graphql(
  GQL_CREATE_CURRENCY
)(AddCurrencyMarkup)
