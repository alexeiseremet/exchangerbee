import './styles.scss';
import React from 'react';
import classnames from 'classnames';

export default (
  {
    disabled = false,
    uiSize = null,
    icon = null,
    labelText,
    ...props
  },
) => {
  const classes = classnames(
    'button',
    {
      [`button--${uiSize}`]: uiSize,
      'button--disabled': disabled,
    },
  );

  return (
    <button className={classes} {...props}>
      {icon && <span className="button__icon" />}

      <span className="button__label">
        {labelText}
      </span>
    </button>
  );
};
