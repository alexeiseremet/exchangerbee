import React from 'react'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

const FormMarkup = ({
    post = null,
    onSubmit,
    action,
  }) => (
    <React.Fragment>
      <div className="text">
        <h1>{t.post} {action}</h1>
      </div>

      <Form
        initialValues={{
          slug: '',
          title: '',
          ...post
        }}
        onSubmit={onSubmit}
      >
        <Input
          name="slug"
          id="post-slug"
          type="text"
          labelText="Slug"
          required
          readOnly={action === 'update'}
        />
        <Input
          name="title"
          id="post-title"
          type="text"
          labelText="Title"
          required
        />
      </Form>
    </React.Fragment>
  );

export default FormMarkup
