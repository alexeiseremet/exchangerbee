import React from 'react';

import Form from '../Form';
import Input from '../Input';

const FormMarkup = ({
  post = null,
  onSubmit,
  action,
}) => (
  <>
    <div className="text">
      <h1>
        {'Post'}
        {' '}
        {action}
      </h1>
    </div>

    <Form
      initialValues={{
        slug: '',
        title: '',
        textFirst: '',
        textSecond: '',
        ...post,
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="slug"
        id="post-slug"
        component="input"
        labelText="Slug"
        required
        readOnly={action === 'update'}
      />
      <Input
        name="title"
        id="post-title"
        component="input"
        labelText="Title"
        required
      />
      <Input
        name="textFirst"
        id="post-textFirst"
        type="textarea"
        labelText="Text first"
      />
      <Input
        name="textSecond"
        id="post-textSecond"
        type="textarea"
        labelText="Text second"
      />
    </Form>
  </>
);

export default FormMarkup;
