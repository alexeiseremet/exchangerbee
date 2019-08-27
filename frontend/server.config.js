const host = 'http://localhost:3050';
const apiPath = '/graphql';
const storagePath = '/storage';

module.exports = {
  apiBaseUrl: `${host}${apiPath}`,
  locale: 'ro',
  timezone: 'Europe/Chisinau',
  country: 'Moldova',
  currency: {
    slug: 'mdl',
    name: 'Leu moldovenesc',
    numCode: '498',
    symbol: 'leu',
  },
  storagePath,
  apiPath,
  host,
};
