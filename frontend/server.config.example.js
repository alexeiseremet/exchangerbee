const host = 'https://md.xezoom.com';
const apiPath = '/graphql';

module.exports = {
  siteName: 'xezoom.com',
  siteGtagId: false,
  siteGads: false,
  siteGdpr: false,
  siteMenu: [
    { url: '/converter', label: 'Convertor valutar' },
    { url: '/banks', label: 'Cursul la bănci' },
    { url: '/currencies', label: 'Lista valute' },
  ],
  adminMenu: [
    { url: '/admin/banks', label: 'Banks' },
    { url: '/admin/parsers', label: 'Parsers' },
    { url: '/admin/quotes', label: 'Quotes' },
    { url: '/admin/posts', label: 'Posts' },
  ],
  apiBaseUrl: `${host}${apiPath}`,
  storagePath: '/space',
  locale: 'ro',
  utcOffset: 120, // 'Europe/Chisinau'
  baseCountry: {
    slug: 'md',
    name: 'Moldova',
    flag: '🇲🇩',
  },
  baseCurrency: {
    slug: 'mdl',
    name: 'Leul moldovenesc',
    numCode: '498',
    symbol: 'lei',
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
