import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const AddCountryMarkup = ({allCurrency, onSubmit}) => (
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
      onSubmit={onSubmit}
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

// Container.
const GQL_ALL_CURRENCY = gql`
  query AllCurrency {
    allCurrency {
      id
      slug
    }
  }
`
const GQL_CREATE_COUNTRY = gql`
  mutation CreateCountry ($country: CountryInput!) {
    createCountry(country: $country) {
      slug,
      numCode
    }
  }
`

export default compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      props: ({allCurrency}) => ({
        allCurrency
      })
    }
  ),
  graphql(
    GQL_CREATE_COUNTRY,
    {
      props: ({mutate}) => ({
        onSubmit: (
          country,
          // form actions
          {
            setStatus,
            setSubmitting,
            resetForm
          }
        ) => {
          mutate({
            variables: {country}
          })
            .then(({createCountry}) => {
              resetForm()
              console.log(createCountry)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      })
    }
  ),
)(AddCountryMarkup)
