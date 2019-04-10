// Import temporary.
import '../assets/scss/helper.scss'
import '../assets/scss/tables.scss'
import '../assets/scss/typography.scss'

import React from 'react'
import { textAdminPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import AddCurrency from '../features/AddCurrency'
import AddCountry from '../features/AddCountry'
import AddInstitution from '../features/AddInstitution'
import Tabs, { Tab } from '../features/Tabs'

const AdminPage = () => (
  <Layout>
    <Metadata title={t.metaTitle}/>
    <Page>
      <Tabs
        items={[
          {
            id: 'add-currency',
            label: 'Add Currency',
            selected: true,
            content: <AddCurrency/>,
          },
          {
            id: 'add-country',
            label: 'Add Country',
            disabled: true,
            content: <AddCountry/>,
          },
          {
            id: 'add-institution',
            label: 'Add Institution',
            disabled: true,
            content: <AddInstitution/>,
          },
        ]}
      />
    </Page>
  </Layout>
)

export default AdminPage
