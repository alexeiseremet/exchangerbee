import React from 'react';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { CreateInstitution } from '../../features/Institution';

const AdminBanksPageMarkup = () => (
  <Layout metadata={{ title: 'Create Institution' }} type="admin">
    <Page>
      <CreateInstitution/>
    </Page>
  </Layout>
);

// getInitialProps.
AdminBanksPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const AdminBanksPageI18N = withTranslation()(AdminBanksPageMarkup);

export default securePage(AdminBanksPageI18N);
