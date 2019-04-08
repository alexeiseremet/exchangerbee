import React, { Fragment } from 'react'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

export default ({mutate}) => (
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

