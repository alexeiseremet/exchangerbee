import React, { Fragment } from 'react'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

const FormMarkup = (
  {
    institution = null,
    onSubmit,
    action,
  }
) => (
  <Fragment>
    <div className="text">
      <h1>{t.institution} {action}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        ...institution
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="name"
        id="institution-name"
        type="text"
        labelText="Name"
        required
      />
      <Input
        name="slug"
        id="institution-slug"
        type="text"
        labelText="Slug"
        required
        readOnly={action === 'update'}
      />
    </Form>
  </Fragment>
)

export default FormMarkup
