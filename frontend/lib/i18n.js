const NextI18Next = require('next-i18next/dist/commonjs');

module.exports = new NextI18Next({
  defaultLanguage: 'ro',
  otherLanguages: ['en', 'ru'],
  localeSubpaths: 'all',
  ignoreRoutes: ['/_next', '/static', '/storage', '/graphql'],
  serverLanguageDetection: false,
  browserLanguageDetection: false,
  strictMode: false,
});
