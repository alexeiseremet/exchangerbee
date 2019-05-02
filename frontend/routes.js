const nextRoutes = require('next-routes')
const routes = nextRoutes()

const APP_ROUTES = [
  {
    page: 'index',
    pattern: '/',
  },
  {
    page: 'admin',
    pattern: '/admin',
  },
  {
    page: 'banks',
    pattern: '/banks/:action(create)?',
  },
  {
    page: 'bank',
    pattern: '/banks/:slug/:action(update|delete)?',
  },
  {
    page: 'rates',
    pattern: '/rates/:action(create)?',
  },
  {
    page: 'rate',
    pattern: '/rates/:slug/:action(update|delete)?',
  },

]

APP_ROUTES.map(route => routes.add(route))

module.exports = routes
