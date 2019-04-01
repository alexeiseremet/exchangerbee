import React from 'react'

import Form from 'Features/Form'
import Input from 'Features/Input'

export default () => {
  return (
    <Form
      initialValues={{
        name: '',
        alias: '',
        country: ''
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
        name="alias"
        id="alias"
        type="text"
        labelText="Alias"
        required
      />
      <Input
        name="country"
        id="country"
        type="text"
        labelText="Country"
        required
      />
    </Form>
  )
}

