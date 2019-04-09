import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddCountryMarkup = ({mutate, data, loading}) => (
  <Fragment>
    <div className="text">
      <h1>{t.country}</h1>
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
        id="country-name"
        type="text"
        labelText="Name"
        required
      />
      <Input
        name="slug"
        id="country-slug"
        type="text"
        labelText="Slug"
        required
      />
      <Input
        name="numCode"
        id="country-num-code"
        type="text"
        labelText="Numeric code"
        required
      />
      <Input
        name="shortName"
        id="country-short-name"
        type="text"
        labelText="Short name"
        required
      />
      <Input
        name="currency"
        id="country-currency"
        type="text"
        labelText="Currency"
        required
      />
    </Form>
  </Fragment>
)

export default compose(
  graphql(gql`
    query AllCurrency {
      allCurrency {
        id
        slug
      }
    }
  `),
  graphql(gql`
    mutation CreateCountry ($country: CreateCountryInput!) {
      createCountry(country: $country) {
        slug,
        numCode
      }
    }
  `),
)(AddCountryMarkup)
