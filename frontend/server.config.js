const host = 'http://localhost:3050';
const apiPath = '/graphql';
const storagePath = '/storage';

module.exports = {
  apiBaseUrl: `${host}${apiPath}`,
  locale: 'ro',
  timezone: 'Europe/Chisinau',
  country: 'Moldova',
  baseCurrency: {
    slug: 'mdl',
    name: 'Leu moldovenesc',
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
