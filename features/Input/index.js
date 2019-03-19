import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import { Field } from 'formik'

export default (
  {
    value = '',
    required = false,
    type = 'text',
    name = null,
    values,
    labelText,
    id,
  }
) => {
  const classes = classnames(
    'input',
    {
      [`input--${type}`]: type,
      [`input--checked`]: values[name] === value || values[name] === true,
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
          aria-required={required}
          aria-label={labelText}
          checked={values[name] === true || values[name] === value}
          type={type}
          value={value || values[name]}
          name={name}
          id={id}
        />

        <i className="input__toggle"/>
      </div>
    </div>
  )
}

