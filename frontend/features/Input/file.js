import './styles.scss';
import React from 'react';
import classnames from 'classnames';

function InputFile({
  required = false,
  readOnly = null,
  name = null,
  labelText,
  id,
  setFieldValue,
}) {
  const classes = classnames(
    'input',
    'input--file',
    {
      'input--required': required,
    },
  );

  const onChange = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFieldValue(name, reader.result);
    };

    reader.readAsDataURL(file);
  };

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
        <input
          className="input__element"
          type="file"
          required={required}
          readOnly={readOnly}
          aria-required={required}
          aria-label={labelText}
          id={id}
          onChange={(e) => {
            onChange(e.currentTarget.files[0]);
          }}
        />

        <div className="">
          preview
        </div>
      </div>
    </div>
  );
}

export default InputFile;
