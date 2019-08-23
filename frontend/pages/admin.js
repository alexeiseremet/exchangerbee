// Import temporary.
import '../assets/scss/helper.scss'
import '../assets/scss/tables.scss'
import '../assets/scss/typography.scss'

import React from 'react'
import { withTranslation } from '../lib/i18n'
import { textAdminPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import Tabs from '../features/Tabs'

const AdminPageMarkup = () => (
  <Layout>
    <Metadata title={t.metaTitle}/>
    <Page>
      <Tabs
        activeIndex={0}
        items={[
          {
            id: 'tab-1',
            label: 'Tab item 1',
            content: 'tab content 1',
          },
          {
            id: 'tab-2',
            label: 'Tab item 2',
            content: 'tab content 2',
          },
        ]}
      />
    </Page>
  </Layout>
);

// getInitialProps.
AdminPageMarkup.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

// i18n.
export default withTranslation('common')(AdminPageMarkup)
