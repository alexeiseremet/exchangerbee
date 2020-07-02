import config from '../server.config';

import LocalMainPage from './main';
import GlobalMainPage from './global/main';

let dynamicMainPage = LocalMainPage;

if (config.baseCountry.slug === 'eu') {
  dynamicMainPage = GlobalMainPage;
}

const Page = dynamicMainPage;

export default Page;
