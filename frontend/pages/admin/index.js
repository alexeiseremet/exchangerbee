// Import temporary.
import '../../assets/scss/helper.scss'
import '../../assets/scss/tables.scss'
import '../../assets/scss/typography.scss'

import React from 'react'
import { withNamespaces } from '../../lib/i18n'
import { textAdminPage as t } from '../../lib/locale'
import Metadata from '../../features/Metadata'
import Layout from '../../features/Layout'
import Page from '../../features/Page'
import CreateCurrencyForm from '../../features/AddCurrency'
import CreateQuoteForm from '../../features/AddQuote'
import CreateParserForm from '../../features/AddParser'
import Tabs, { Tab } from '../../features/Tabs'

class AdminPageMarkup extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  render () {
    return (
      <Layout>
        <Metadata title={t.metaTitle}/>
        <Page>
          <Tabs
            activeIndex={0}
            items={[
              {
                id: 'add-parser',
                label: 'Add Parser',
                content: <CreateParserForm action="create"/>,
              },
              {
                id: 'add-currency',
                label: 'Add Currency',
                content: <CreateCurrencyForm action="create"/>,
              },
              {
                id: 'add-quote',
                label: 'Add Quote',
                content: <CreateQuoteForm action="create"/>,
              },
            ]}
          />
        </Page>
      </Layout>
    )
  }
}

// i18n.
const AdminPageI18N = withNamespaces('common')(AdminPageMarkup)

export default AdminPageI18N
