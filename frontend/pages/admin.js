// Import temporary.
import '../assets/scss/helper.scss';
import '../assets/scss/tables.scss';
import '../assets/scss/typography.scss';

import React from 'react';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import Tabs from '../features/Tabs';
import Modal from '../features/Modal';
import ModalHandler from '../features/Modal/ModalHandler';

const AnyTypeModalContent = (
  // eslint-disable-next-line no-alert
  <button style={{ color: 'red' }} onClick={() => alert('hi')}>
    Any type content
  </button>
);


const AdminPageMarkup = () => (
  <>
    <Layout>
      <Page>
        <Tabs
          activeIndex={0}
          items={[
            {
              id: 'tab-1',
              label: 'Tab item 1',
              content: <ModalHandler label="Open modal 1" title="Modal title" content="modal content" />,
            },
            {
              id: 'tab-2',
              label: 'Tab item 2',
              content: <ModalHandler label="Open modal 2" title="Any type of content 1" content={AnyTypeModalContent} />,
            },
          ]}
        />
      </Page>
    </Layout>
    <Modal />
  </>

);

// getInitialProps.
AdminPageMarkup.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

// i18n.
export default withTranslation('common')(AdminPageMarkup);
