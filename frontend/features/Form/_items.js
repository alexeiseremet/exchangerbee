import './styles.scss';
import React from 'react';
import classnames from 'classnames';

export default ({ children, ...props }) => {
  const classes = classnames(
    'form__row',
  );

  return (
    React.Children.map(children, (child) => (
      <div className={classes}>
        {React.cloneElement(child, { ...props })}
      </div>
    ))
  );
};
