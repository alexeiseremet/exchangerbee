import React from 'react';
import config from '../server.config';

import LocalMainPage from './main';
import GlobalMainPage from './global/main';

let DynamicMainPage = LocalMainPage;

if (config.baseCountry.slug === 'eu') {
  DynamicMainPage = GlobalMainPage;
}

export default DynamicMainPage;
