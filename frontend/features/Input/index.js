import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import { Field } from 'formik';
import _get from 'lodash/get';

function Input({
  value = '',
  values,
  required = null,
  readOnly = null,
  type = 'text',
  component = 'input',
  name,
  autocomplete = null,
  labelText,
  id,
}) {
  const valueByName = _get(values, name);
  const checked = ['checkbox', 'radio'].includes(type) && (
    (value !== '' && valueByName === value) || (valueByName === true)
  );

  const classes = classnames(
    'input',
    {
      [`input--${type}`]: type,
      'input--checked': checked,
      'input--required': required,
    },
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
          type={type}
          component={component}
          name={name}
          id={id}
          autoComplete={autocomplete}
          {...(checked && { checked })}
          {...(value || (valueByName && { value: value || valueByName }))}
        />

        {type !== 'text' && (<i className="input__toggle" />)}
      </div>
    </div>
  );
}

export default Input;
