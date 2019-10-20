import React from 'react';
import { withTranslation } from '../../lib/i18n';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import LoginForm from '../../features/LoginForm';

const LoginPageMarkup = () => (
  <>
    <Layout metadata={{ title: 'Login' }}>
      <Page type="admin">
        <LoginForm/>
      </Page>
    </Layout>
  </>
);

// getInitialProps.
LoginPageMarkup.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

// i18n.
const LoginPageI18N = withTranslation('common')(LoginPageMarkup);

export default LoginPageI18N;
