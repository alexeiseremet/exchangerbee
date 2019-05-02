import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export const CreateCurrencyForm = ({onSubmit, currency = null}) => (
  <React.Fragment>
    <div className="text">
      <h1>{t.currency}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        numCode: '',
        symbol: '',
        ...currency
      }}
      onSubmit={onSubmit}
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
  </React.Fragment>
)

// Container.
const GQL_CREATE_CURRENCY = gql`
  mutation CreateCurrency ($currency: CurrencyInput!) {
    createCurrency(currency: $currency) {
      slug
      numCode
    }
  }
`

export default compose(
  graphql(
    GQL_CREATE_CURRENCY,
    {
      props: ({mutate}) => ({
        onSubmit: (
          // form values & actions
          currency,
          {setStatus, setSubmitting}
        ) => {
          mutate({
            variables: {currency}
          })
            .then(({data: {createCurrency}}) => {
              console.log(createCurrency)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      }),
    }
  )
)(CreateCurrencyForm)
