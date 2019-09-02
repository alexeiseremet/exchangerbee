import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import { Field } from 'formik';

export default (
  {
    children,
    onChange,
    required = false,
    readOnly = null,
    name = null,
    labelText,
    id,
  },
) => {
  const classes = classnames(
    'input',
    'input--select',
    {
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
          component="select"
          required={required}
          readOnly={readOnly}
          aria-required={required}
          aria-label={labelText}
          name={name}
          id={id}
          {...(onChange && { onChange })}
        >
          {children}
        </Field>

        <i className="input__toggle" />
      </div>
    </div>
  );
};
