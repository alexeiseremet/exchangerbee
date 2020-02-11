import './styles.scss';
import React from 'react';

import Metadata from '../Metadata';
import MainMenu from '../MainMenu';

import Header from './_header';
import Content from './_content';
import Footer from './_footer';

const Layout = ({ children, metadata, type }) => (
  <>
    {metadata && (<Metadata {...metadata} />)}

    <div className="layout" id="layout" >
      <Header>
        <MainMenu type={type}/>
      </Header>
      <Content>{children}</Content>
      <Footer />
    </div>
  </>
);

export default Layout;
