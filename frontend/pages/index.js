// Import temporary.
import '../assets/scss/helper.scss'
import '../assets/scss/tables.scss'
import '../assets/scss/typography.scss'

import React from 'react'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import AddCountry from '../features/AddCountry'
import AddCurrency from '../features/AddCurrency'
import AddInstitution from '../features/AddInstitution'

class Index extends React.Component {
  /**
   * NextJS async function that runs at the server and at the client side.
   * https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle.
   *
   * @param {Object} store Redux store.
   * @returns {Object} Returns empty object.
   */
  static async getInitialProps ({store}) {
    // await store.dispatch(loadPostcardList())

    return {}
  }

  render () {
    return (
      <Layout>
        <Metadata
          title={t.metaTitle}
          description={t.metaDescription}
          ogTitle={t.ogTitle}
          ogDescription={t.ogDescription}
        />

        <Page>
          <AddCurrency/>
        </Page>
      </Layout>
    )
  }
}

export default Index
