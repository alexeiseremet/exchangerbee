import React from 'react';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { CreateCurrency } from '../../features/Currency';

const AdminCurrenciesPageMarkup = () => (
  <Layout metadata={{ title: 'Create Currency' }} type="admin">
    <Page>
      <CreateCurrency/>
    </Page>
  </Layout>
);

// getInitialProps.
AdminCurrenciesPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const AdminCurrenciesPageI18N = withTranslation()(AdminCurrenciesPageMarkup);

export default securePage(AdminCurrenciesPageI18N);
