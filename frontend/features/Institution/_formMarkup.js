import React from 'react';

import { textAdminPage as t } from '../../lib/locale';
import Form from '../Form';
import Input from '../Input';
import Select from '../Input/select';

const FormMarkup = ({
  institution = null,
  onSubmit,
  action,
}) => (
  <>
    <div className="text">
      <h1>
        {t.institution}
        {' '}
        {action}
      </h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        category: 'commercial',
        ...institution,
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="name"
        id="institution-name"
        component="input"
        labelText="Name"
        required
      />
      <Select
        name="category"
        id="institution-category"
        labelText="Category"
        required
      >
        <option value="central">central</option>
        <option value="commercial">commercial</option>
      </Select>
      <Input
        name="slug"
        id="institution-slug"
        component="input"
        labelText="Slug"
        required
        readOnly={action === 'update'}
      />
    </Form>
  </>
);

export default FormMarkup;
