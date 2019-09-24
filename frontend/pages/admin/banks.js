import React from 'react';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { CreateInstitution } from '../../features/Institution';

const AdminBanksPageMarkup = () => (
  <Layout metadata={{ title: 'Create Institution' }}>
    <Page type="admin">
      <CreateInstitution/>
    </Page>
  </Layout>
);

// getInitialProps.
AdminBanksPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const AdminBanksPageI18N = withTranslation('common')(AdminBanksPageMarkup);

export default securePage(AdminBanksPageI18N);
