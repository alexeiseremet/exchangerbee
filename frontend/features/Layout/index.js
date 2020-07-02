import './styles.scss';
import React from 'react';
import { getTranslatedConfig } from '../../server.config';
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
  const { siteName, countries } = getTranslatedConfig(t);

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
            <div className="flex__item-grow">
              {countries.map((country, index) => (
                <div style={{ display: 'inline' }} key={index}>
                  {!!index && (' / ')}
                  <a href={`//${country.slug}.${siteName}`}>{country.name}</a>
                </div>
              ))}
            </div>

            <div>
              <a href="/ro">română</a>{' / '}<a href="/ru">русский</a>
            </div>
          </div>
        </Footer>
      </div>
    </>
  );
};

export default withTranslation()(Layout);
