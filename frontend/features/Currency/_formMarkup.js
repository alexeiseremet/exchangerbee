import React from 'react';

import { textAdminPage as t } from '../../lib/locale';
import Form from '../Form';
import Input from '../Input';

const FormMarkup = (
  {
    currency = null,
    onSubmit,
    action,
  },
) => (
  <>
    <div className="text">
      <h1>
        {t.currency}
        {' '}
        {action}
      </h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        numCode: '',
        symbol: '',
        ...currency,
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="name"
        id="currency-name"
        component="input"
        labelText="Name"
        required
      />
      <Input
        name="slug"
        id="currency-slug"
        component="input"
        labelText="Slug"
        required
        readOnly={action === 'update'}
      />
      <Input
        name="numCode"
        id="currency-num-code"
        component="input"
        labelText="Numeric code"
        required
      />
      <Input
        name="symbol"
        id="currency-symbol"
        component="input"
        labelText="Symbol"
      />
    </Form>
  </>
);

export default FormMarkup;
