const NextI18Next = require('next-i18next').default;
const { locale } = require('../server.config');

module.exports = new NextI18Next({
  defaultLanguage: locale,
  otherLanguages: ['en', 'ru'],
  localeSubpaths: {
    en: 'en',
    ro: 'ro',
    ru: 'ru',
  },
  localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
  ignoreRoutes: ['/_next', '/static', '/storage', '/graphql', '/jsonwidget'],
  serverLanguageDetection: false,
  browserLanguageDetection: false,
  strictMode: false,
});
