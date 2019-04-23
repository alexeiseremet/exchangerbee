import React from 'react'
import { withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import ModalHandler from '../features/Modal/ModalHandler'
import Modal from '../features/Modal'

class IndexPageMarkup extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  render () {
    return (
      <React.Fragment>
        <Layout>
          <Metadata
            title={t.metaTitle}
            description={t.metaDescription}
            ogTitle={t.ogTitle}
            ogDescription={t.ogDescription}
          />

          <Page>
            <ModalHandler/>
          </Page>
        </Layout>
        <Modal/>
      </React.Fragment>
    )
  }
}

// i18n.
const IndexPageI18N = withNamespaces('common')(IndexPageMarkup)

export default IndexPageI18N
