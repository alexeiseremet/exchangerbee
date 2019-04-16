const NextI18Next = require('next-i18next/dist/commonjs')

module.exports = new NextI18Next({
  otherLanguages: ['ro', 'ru'],
  localeSubpaths: 'all',
  ignoreRoutes: ['/_next', '/static', '/graphql', '/admin', '/storage'],
  serverLanguageDetection: false,
  browserLanguageDetection: false,
})
