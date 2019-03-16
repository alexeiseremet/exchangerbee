import './styles.scss'
import React from 'react'
import classnames from 'classnames'

export default (
  {
    id,
    label,
    type = 'text',
    required = false,
    disabled = false,
    checked = null,
    value = '',
    onChange = null,
  }
) => {
  const classes = classnames(
    'input',
    {
      [`input--${type}`]: type,
      [`input--required`]: required,
      [`input--disabled`]: disabled,
    }
  )

  return (
    <div className={classes}>
      <label className="input__label" htmlFor={id}>{label}</label>

      <div className="input__control">
        <input className="input__element"
               id={id}
               type={type}
               required={required}
               disabled={disabled}
               checked={checked}
               defaultValue={value}
               onChange={onChange}
        />
        <i className="input__toggle"/>
      </div>
    </div>
  )
}

