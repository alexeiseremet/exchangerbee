const nextRoutes = require('next-routes')
const routes = nextRoutes()

const APP_ROUTES = [
  {
    page: 'index',
    pattern: '/',
  },
  {
    page: 'quotes',
    pattern: '/quotes/:slug?',
  },
]

APP_ROUTES.map(route => routes.add(route))

module.exports = routes
