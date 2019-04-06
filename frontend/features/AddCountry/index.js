import React from 'react'

import Form from 'Features/Form'
import Input from 'Features/Input'

export default () => {
  return (
    <Form
      initialValues={{
        slug: '',
        currency: '',
        name: '',
        numCode: '',
        shortName: ''
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
  )
}

