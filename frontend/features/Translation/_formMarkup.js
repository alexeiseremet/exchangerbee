import React from 'react';

import Form from '../Form';
import Input from '../Input';

const FormMarkup = ({
  translation,
  onSubmit,
  action,
}) => (
  <>
    <div className="text">
      <h1>
        {'Translation'}
        {' '}
        {action}
      </h1>
    </div>

    <Form
      initialValues={translation}
      onSubmit={onSubmit}
    >
      <Input
        name="fields.name"
        id="translation-name"
        component="input"
        labelText="Name"
        required
      />
      {translation.fields.symbol ? (
        <Input
          name="fields.symbol"
          id="translation-symbol"
          component="input"
          labelText="Symbol"
          required
        />
      ) : <></>}
    </Form>
  </>
);

export default FormMarkup;
