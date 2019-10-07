const host = 'http://md.xezoom.com';
const apiPath = '/graphql';

module.exports = {
  siteName: 'xezoom.com',
  siteGtagId: 'G-FTFEZD3BQX',
  siteMenu: [
    { url: '/banks', label: 'Cursul la bănci' },
    { url: '/converter', label: 'Convertor valutar' },
    { url: '/currencies', label: 'Lista valute' },
  ],
  adminMenu: [
    { url: '/admin/parsers', label: 'Parsers' },
    { url: '/admin/quotes', label: 'Quotes' },
    { url: '/admin/posts', label: 'Posts' },
  ],
  apiBaseUrl: `${host}${apiPath}`,
  storagePath: '/storage',
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
    bid: '1',
    ask: '1',
  },
  centralBank: {
    name: 'Banca Naţională a Moldovei',
    slug: 'bnm',
  },
  baseCurrenciesArr: ['usd', 'eur', 'ron', 'rub', 'uah'],
  apiPath,
  host,
};
