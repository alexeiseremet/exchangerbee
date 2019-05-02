import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import { Field } from 'formik'

export default (
  {
    value = '',
    required = false,
    readOnly = null,
    type = 'text',
    name = null,
    autocomplete = "off",
    values,
    labelText,
    id,
  }
) => {
  const classes = classnames(
    'input',
    {
      [`input--${type}`]: type,
      [`input--checked`]: (value !== '' && values[name] === value) || (values[name] === true),
      [`input--required`]: required,
    }
  )

  return (
    <div className={classes}>
      <label className="input__label" htmlFor={id}>
        {labelText}
      </label>

      <div className="input__control">
        <Field
          className="input__element"
          required={required}
          readOnly={readOnly}
          aria-required={required}
          aria-label={labelText}
          checked={values[name] === true || values[name] === value}
          type={type}
          value={value || values[name]}
          name={name}
          id={id}
          autoComplete={autocomplete}
        />

        <i className="input__toggle"/>
      </div>
    </div>
  )
}

