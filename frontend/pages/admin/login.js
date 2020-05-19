import React from 'react';
import { withTranslation } from '../../lib/i18n';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import LoginForm from '../../features/LoginForm';

const LoginPageMarkup = () => (
  <>
    <Layout metadata={{ title: 'Login' }} type="admin">
      <Page>
        <LoginForm/>
      </Page>
    </Layout>
  </>
);

// getInitialProps.
LoginPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const LoginPageI18N = withTranslation()(LoginPageMarkup);

export default LoginPageI18N;
