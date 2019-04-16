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
    page: 'bank',
    pattern: '/banks/:slug',
  },
  {
    page: 'banks',
    pattern: '/banks',
  },
  {
    page: 'country',
    pattern: '/countries/:slug',
  },
  {
    page: 'countries',
    pattern: '/countries',
  },
  {
    page: 'rate',
    pattern: '/rates/:slug',
  },
  {
    page: 'rates',
    pattern: '/rates',
  },
]

APP_ROUTES.map(route => routes.add(route))

module.exports = routes
