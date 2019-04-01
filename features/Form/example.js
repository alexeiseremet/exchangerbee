import React from 'react'

import Form from 'Features/Form'
import Fieldset from 'Features/Form/_fieldset'
import Input from 'Features/Input'

export default () => {
  return (
    <Form
      initialValues={{
        text: 'jared',
        checkbox: true,
        radioGroup: 'radio2'
      }}
    >
      <Input
        name="text"
        id="text"
        type="text"
        labelText="Text"
        required
      />
      <Input
        name="checkbox"
        id="checkbox"
        type="checkbox"
        labelText="Checkbox"
      />
      <Input
        name="radio"
        id="radio"
        type="radio"
        value="radio"
        labelText="Radio 0"
      />
      <Fieldset legendText="Radio Group">
        <Input
          name="radioGroup"
          id="radio1"
          value="radio1"
          type="radio"
          labelText="Radio 1"
        />
        <Input
          name="radioGroup"
          id="radio2"
          value="radio2"
          type="radio"
          labelText="Radio 2"
        />
      </Fieldset>
    </Form>
  )
}

