import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import { Field } from 'formik'
import _get from 'lodash/get'

export default (
  {
    value = '',
    values,
    required = false,
    readOnly = null,
    type = 'text',
    name = null,
    autocomplete = "off",
    labelText,
    id,
  }
) => {
  const valueByName = _get(values, name);
  const classes = classnames(
    'input',
    {
      [`input--${type}`]: type,
      [`input--checked`]: (value !== '' && valueByName === value) || (valueByName === true),
      [`input--required`]: required,
    }
  );

  return (
    <div className={classes}>
      {
        labelText && (
          <label className="input__label" htmlFor={id}>
            {labelText}
          </label>
        )
      }

      <div className="input__control">
        <Field
          className="input__element"
          required={required}
          readOnly={readOnly}
          aria-required={required}
          aria-label={labelText}
          checked={valueByName === true || valueByName === value}
          type={type}
          value={value || valueByName}
          name={name}
          id={id}
          autoComplete={autocomplete}
        />

        {type !== 'text' && (<i className="input__toggle" />)}
      </div>
    </div>
  )
}
