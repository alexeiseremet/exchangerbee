import React, { Fragment } from 'react'

import Form from '../Form'
import Input from '../Input'
import { textAdminPage as t } from '../../lib/locale'

export default ({mutate}) => (
  <Fragment>
    <div className="text">
      <h1>{t.institution}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        country: ''
      }}
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
      />
      <Input
        name="country"
        id="institution-country"
        type="text"
        labelText="Country"
        required
      />
    </Form>
  </Fragment>
)


