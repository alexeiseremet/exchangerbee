// Import temporary.
import '../assets/scss/helper.scss'
import '../assets/scss/tables.scss'
import '../assets/scss/typography.scss'

import React from 'react'
import { textIndexPage as t } from 'Lib/locale'

import Metadata from 'Features/Metadata'
import Layout from 'Features/Layout'
import Page from 'Features/Page'
import Form from 'Features/Form'
import Input from 'Features/Input'
import Fieldset from 'Features/Form/_fieldset'

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
          <Form initialValues={
            {
              text: 'jared',
              checkbox: true,
              radioGroup: 'radio2'
            }
          }>
            <Input
              name="text"
              id="text"
              type="text"
              labelText="Text"
              required
            />
            <Input
              name="checkbox"
              id="checkbox"
              type="checkbox"
              labelText="Checkbox"
            />
            <Input
              name="radio"
              id="radio"
              type="radio"
              value="radio"
              labelText="Radio 0"
            />
            <Fieldset legendText="Radio Group">
              <Input
                name="radioGroup"
                id="radio1"
                value="radio1"
                type="radio"
                labelText="Radio 1"
              />
              <Input
                name="radioGroup"
                id="radio2"
                value="radio2"
                type="radio"
                labelText="Radio 2"
              />
            </Fieldset>
          </Form>

        </Page>
      </Layout>
    )
  }
}

export default Index
