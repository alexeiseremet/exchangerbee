import React from 'react'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'

const IndexPageMarkup = () => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />

    <Page>
      {`index`}
    </Page>
  </Layout>
)

export default IndexPageMarkup
