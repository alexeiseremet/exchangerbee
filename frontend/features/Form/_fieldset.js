import './styles.scss'
import React from 'react'
import classnames from 'classnames'

export default (
  {
    children,
    legendText,
    ...props
  }
) => {
  const classes = classnames(
    'form__fieldset',
  )

  return (
    <fieldset className={classes}>
      <legend className="form__legend">{legendText}</legend>

      <div className="flex">
        {
          React.Children.map(children, child => (
            <div className="form__group-item">
              {React.cloneElement(child, {...props})}
            </div>
          ))
        }
      </div>
    </fieldset>
  )
}

