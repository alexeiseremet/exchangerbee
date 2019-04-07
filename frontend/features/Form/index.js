import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import { Formik, Form as FormikForm } from 'formik'
import Button from '../Button'
import Items from './_items'

export default (
  {
    onSubmit = values => console.log(values),
    initialValues,
    validationSchema,
    children,
  }
) => {
  const classes = classnames(
    'form'
  )

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={props => (
        <FormikForm className={classes}>
          <Items children={children} {...props}/>

          <div className="form__row">
            {props.errors.name && <div>{props.errors.name}</div>}

            <Button type="submit" labelText="Submit"/>
          </div>
        </FormikForm>
      )}
      noValidate
    />
  )
}

