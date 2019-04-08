import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddCountryMarkup = ({mutate}) => (
  <Fragment>
    <div className="text">
      <h1>{t.addCountry}</h1>
    </div>
    <Form
      initialValues={{
        slug: '',
        currency: '',
        name: '',
        numCode: '',
        shortName: ''
      }}
      onSubmit={values => {
        mutate({
          variables: {country: values}
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
        name="shortName"
        id="shortName"
        type="text"
        labelText="Short name"
        required
      />
      <Input
        name="currency"
        id="currency"
        type="text"
        labelText="Currency"
        required
      />
    </Form>
  </Fragment>
)

export default graphql(gql`
  mutation createCountryMutation ($country: CreateCountryInput!) {
    createCountry(country: $country) {
      slug,
      numCode
    }
  }
`)(AddCountryMarkup)
