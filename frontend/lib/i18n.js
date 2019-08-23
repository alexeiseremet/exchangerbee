const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'ro',
  otherLanguages: ['en', 'ru'],
  localeSubpaths: {
    en: 'en',
    ro: 'ro',
    ru: 'ru',
  },
  ignoreRoutes: ['/_next', '/static', '/storage', '/graphql'],
  serverLanguageDetection: false,
  browserLanguageDetection: false,
  strictMode: false,
});
