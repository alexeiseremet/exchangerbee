const host = 'http://localhost:3050';
const apiPath = '/graphql';
const storagePath = '/storage';

module.exports.host = host;
module.exports.apiPath = apiPath;
module.exports.apiBaseUrl = `${host}${apiPath}`;
module.exports.storagePath = storagePath;
module.exports.locale = 'ro';
module.exports.timezone = 'Europe/Chisinau';
module.exports.country = 'Moldova';
module.exports.currency = {
  slug: 'mdl',
  name: 'Leu moldovenesc',
  numCode: '498',
  symbol: 'leu',
};
