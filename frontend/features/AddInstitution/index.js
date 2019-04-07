import React from 'react'

import Form from '../Form'
import Input from '../Input'

export default () => {
  return (
    <Form
      initialValues={{
        name: '',
        slug: '',
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
        name="slug"
        id="slug"
        type="text"
        labelText="Slug"
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

