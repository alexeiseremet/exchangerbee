import React from 'react';

import Form from '../Form';
import Input from '../Input';

const FormMarkup = ({
  onSubmit,
}) => (
  <Form
    initialValues={{
      password: '',
    }}
    onSubmit={onSubmit}
  >
    <Input
      name="password"
      id="user-password"
      type="password"
      component="input"
      labelText="password"
      required
    />
  </Form>
);

export default FormMarkup;
