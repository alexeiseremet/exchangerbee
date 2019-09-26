const host = 'http://md.xezoom.com:3050';
const apiPath = '/graphql';
const storagePath = '/storage';

module.exports = {
  siteName: 'xezoom.com',
  siteMenu: [
    // { url: '/converter', label: 'Convertor valutar' },
    { url: '/banks', label: 'Cursul la bănci' },
    { url: '/currencies', label: 'Lista valute' },
  ],
  adminMenu: [
    { url: '/admin/parsers', label: 'Parsers' },
    { url: '/admin/quotes', label: 'Quotes' },
    { url: '/admin/posts', label: 'Posts' },
  ],
  apiBaseUrl: `${host}${apiPath}`,
  locale: 'ro',
  timezone: 'Europe/Chisinau',
  baseCountry: {
    slug: 'md',
    name: 'Moldova',
    flag: '🇲🇩',
  },
  baseCurrency: {
    slug: 'mdl',
    name: 'Leul moldovenesc',
    numCode: '498',
    symbol: 'leu',
  },
  centralBank: {
    name: 'Banca Naţională a Moldovei',
    slug: 'bnm',
  },
  baseCurrenciesArr: ['usd', 'eur', 'ron', 'rub', 'uah'],
  storagePath,
  apiPath,
  host,
};
