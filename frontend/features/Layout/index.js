import './styles.scss';
import React from 'react';
import { withTranslation } from '../../lib/i18n';

import Metadata from '../Metadata';
import MainMenu from '../MainMenu';

import Header from './_header';
import Content from './_content';
import Footer from './_footer';

const Layout = (props) => {
  const {
    t, children, metadata, type,
  } = props;

  return (
    <>
      {metadata && (<Metadata {...metadata} />)}

      <div className="layout" id="layout">
        <Header>
          <MainMenu type={type}/>
        </Header>
        <Content>{children}</Content>
        <Footer>
          <div className="flex flex--wrap" style={{ margin: '2rem 0', fontSize: '1.2rem' }}>
            <p className="flex__item-grow">
              <a href="/ro">română</a>{' / '}<a href="/ru">русский</a>
            </p>
            <p>{`© 2020 exchangerbee.com ${t('Toate drepturile rezervate')}.`}</p>
          </div>
        </Footer>
      </div>
    </>
  );
};

export default withTranslation()(Layout);
