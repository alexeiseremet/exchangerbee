import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { setUserCookie } from '../../lib/session';
import FormMarkup from './_formMarkup';

const LoginForm = ({ onSubmit }) => (
  <FormMarkup onSubmit={onSubmit} />
);

const GQL_LOGIN = gql`
  mutation Login ($password: String!) {
    login(password: $password) {
      token
    }
  }
`;

export default _compose(
  graphql(
    GQL_LOGIN,
    {
      props: ({ mutate }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting, resetForm },
        ) => {
          mutate({
            variables: { password: formValues.password },
          })
            .then(({ data: { login } }) => {
              resetForm();
              // eslint-disable-next-line no-console
              console.dir(login);
              setUserCookie(login);
            })
            .catch((err) => {
              setStatus('error');
              setSubmitting(false);
              // eslint-disable-next-line no-console
              console.error(err);
            });
        },
      }),
    },
  ),
)(LoginForm);
