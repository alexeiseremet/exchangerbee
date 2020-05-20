const NextI18Next = require('next-i18next').default;
const { locale } = require('../server.config');
const localeSubpaths = {
  en: 'en',
  ro: 'ro',
  ru: 'ru',
  uk: 'uk',
};
const otherLanguages = Object.keys(localeSubpaths).filter(key => key !== locale);

module.exports = new NextI18Next({
  defaultLanguage: locale,
  localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
  ignoreRoutes: ['/_next', '/static', '/storage', '/graphql', '/jsonwidget'],
  serverLanguageDetection: false,
  browserLanguageDetection: false,
  strictMode: false,
  otherLanguages,
  localeSubpaths,
});
