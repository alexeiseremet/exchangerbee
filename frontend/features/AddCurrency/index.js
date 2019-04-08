import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import Form from '../Form'
import Input from '../Input'

export const AddCurrencyMarkup = ({mutate}) => (
  <Form
    initialValues={{
      name: '',
      slug: '',
      numCode: ''
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
  </Form>
)

export default graphql(gql`
  mutation createCurrencyMutation ($currency: CreateCurrencyInput!) {
    createCurrency(currency: $currency) {
      id,
      slug,
      numCode
    }
  }
`)(AddCurrencyMarkup)
