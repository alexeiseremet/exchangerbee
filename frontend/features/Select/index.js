import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import { Field } from 'formik'
import _get from 'lodash/get'

export default (
  {
    value = '',
    required = false,
    readOnly = null,
    name = null,
    values,
    labelText,
    id,
  }
) => {
  const valueByName = _get(values, name);
  const classes = classnames(
    'input',
    'input--select',
    {
      [`input--required`]: required,
    }
  );

  return (
    <div className={classes}>
      <label className="input__label" htmlFor={id}>
        {labelText}
      </label>

      <div className="input__control">
        <Field
          className="input__element"
          component="select"
          required={required}
          readOnly={readOnly}
          aria-required={required}
          aria-label={labelText}
          value={value || valueByName}
          name={name}
          id={id}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>

        <i className="input__toggle" />
      </div>
    </div>
  )
}
