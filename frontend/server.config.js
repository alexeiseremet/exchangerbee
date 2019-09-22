const host = 'http://localhost:3050';
const apiPath = '/graphql';
const storagePath = '/storage';

module.exports = {
  siteName: 'xezoom.com',
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
