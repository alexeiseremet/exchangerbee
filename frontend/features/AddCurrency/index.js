import React from 'react'

import Form from 'Features/Form'
import Input from 'Features/Input'

export default () => {
  return (
    <Form
      initialValues={{
        name: '',
        slug: '',
        numCode: ''
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
}

