import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import { Formik, Form as FormikForm } from 'formik';
import Button from '../Button';
import Items from './_items';

export default (
  {
    onSubmit = (values) => console.log(values),
    initialValues,
    validationSchema,
    children,
  },
) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    render={(props) => {
      const classes = classnames(
        'form',
      );

      return (
        <FormikForm className={classes}>
          <Items {...props}>{children}</Items>

          <div className="form__row">
            <Button
              type="submit"
              labelText="Submit"
              disabled={props.isSubmitting}
            />

            {props.errors.name && <div>{props.errors.name}</div>}
          </div>
        </FormikForm>
      );
    }}
    noValidate
  />
);
