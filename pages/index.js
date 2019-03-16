// Import temporary.
import '../assets/scss/form.scss'
import '../assets/scss/helper.scss'
import '../assets/scss/tables.scss'
import '../assets/scss/typography.scss'

import React from 'react'
import { textIndexPage as t } from 'Lib/locale'

import Metadata from 'Features/Metadata'
import Layout from 'Features/Layout'
import Page from 'Features/Page'
import Input from 'Features/Input'

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
          <Input id="text" type="text" label="Text"/>
          <Input id="checkbox" type="checkbox" label="Checkbox" value="Checkbox input"/>
          <Input id="radio" type="radio" label="Radio" value="Radio input"/>

          <button className="button" type="submit">
            Save
          </button>
        </Page>
      </Layout>
    )
  }
}

export default Index
