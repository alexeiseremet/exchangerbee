const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'ro',
  otherLanguages: ['en', 'ru'],
  localeSubpaths: {
    en: 'en',
    ro: 'ro',
    ru: 'ru',
  },
  localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
  ignoreRoutes: ['/_next', '/static', '/storage', '/graphql', '/widget'],
  serverLanguageDetection: false,
  browserLanguageDetection: false,
  strictMode: false,
});
