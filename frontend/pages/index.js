import React from 'react'
import { withTranslation } from '../lib/i18n'
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

const IndexPageMarkup = () => (
  <React.Fragment>
    <Layout>
      <Metadata
        title={t.metaTitle}
        description={t.metaDescription}
        ogTitle={t.ogTitle}
        ogDescription={t.ogDescription}
      />

      <Page>
        <ModalHandler title="Modal title" content="modal content"/>
        <ModalHandler title="Any type of content 1" content={AnyTypeModalContent}/>
        <ModalHandler title="Any type of content 2" content={AnyTypeModalContent} />
      </Page>
    </Layout>
    <Modal/>
  </React.Fragment>
);

// getInitialProps.
IndexPageMarkup.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

// i18n.
export default withTranslation('common')(IndexPageMarkup);
