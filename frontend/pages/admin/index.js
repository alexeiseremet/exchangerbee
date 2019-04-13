// Import temporary.
import '../../assets/scss/helper.scss'
import '../../assets/scss/tables.scss'
import '../../assets/scss/typography.scss'

import React from 'react'
import { textAdminPage as t } from '../../lib/locale'
import Metadata from '../../features/Metadata'
import Layout from '../../features/Layout'
import Page from '../../features/Page'
import AddCurrency from '../../features/AddCurrency'
import AddCountry from '../../features/AddCountry'
import AddInstitution from '../../features/AddInstitution'
import AddQuote from '../../features/AddQuote'
import Tabs, { Tab } from '../../features/Tabs'

const AdminPage = () => (
  <Layout>
    <Metadata title={t.metaTitle}/>
    <Page>
      <Tabs
        items={[
          {
            id: 'add-quote',
            label: 'Add Quote',
            content: <AddQuote/>,
          },
          {
            id: 'add-currency',
            label: 'Add Currency',
            content: <AddCurrency/>,
          },
          {
            id: 'add-country',
            label: 'Add Country',
            content: <AddCountry/>,
          },
          {
            id: 'add-institution',
            label: 'Add Institution',
            content: <AddInstitution/>,
          },
        ]}
      />
    </Page>
  </Layout>
)

export default AdminPage
