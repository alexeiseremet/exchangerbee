import React from 'react'
import { withNamespaces } from '../lib/i18n'
import { textIndexPage as t } from '../lib/locale'
import Metadata from '../features/Metadata'
import Layout from '../features/Layout'
import Page from '../features/Page'
import ModalHandler from '../features/Modal/ModalHandler'
import Modal from '../features/Modal'

const AnyTypeModalContent = (
  <button style={{ color: 'red' }} onClick={() => alert('hi')}>
    Any type content
  </button>
);

class IndexPageMarkup extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    }
  }

  render() {
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
            <ModalHandler title="Modal title" content="modal content" />
            <ModalHandler title="Any type of content 1" content={AnyTypeModalContent} />
            <ModalHandler title="Any type of content 2" content={AnyTypeModalContent} />
            <ModalHandler title="Any type of content 3" content={AnyTypeModalContent} />
            <ModalHandler title="Any type of content 4" content={AnyTypeModalContent} />
          </Page>
        </Layout>
        <Modal />
      </React.Fragment>
    )
  }
}

// i18n.
const IndexPageI18N = withNamespaces('common')(IndexPageMarkup);

export default IndexPageI18N;
