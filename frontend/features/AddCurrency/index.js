import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddCurrencyMarkup = ({mutate}) => (
  <Fragment>
    <div className="text">
      <h1>{t.addCurrency}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        numCode: '',
        symbol: '',
      }}
      onSubmit={values => {
        mutate({
          variables: {currency: values}
        })
      }}
    >
      <Input
        name="name"
        id="name"
        type="text"
        labelText="Name"
        required
      />
      <Input
        name="slug"
        id="slug"
        type="text"
        labelText="Slug"
        required
      />
      <Input
        name="numCode"
        id="numCode"
        type="text"
        labelText="Numeric code"
        required
      />
      <Input
        name="symbol"
        id="symbol"
        type="text"
        labelText="Symbol"
      />
    </Form>
  </Fragment>
)

export default graphql(gql`
  mutation createCurrencyMutation ($currency: CreateCurrencyInput!) {
    createCurrency(currency: $currency) {
      slug,
      numCode
    }
  }
`)(AddCurrencyMarkup)
