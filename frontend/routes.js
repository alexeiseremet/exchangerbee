const nextRoutes = require('next-routes');

const routes = nextRoutes();

const APP_ROUTES = [
  {
    page: 'index',
    pattern: '/',
  },
  {
    page: 'banks',
    pattern: '/banks',
  },
  {
    page: 'bank',
    pattern: '/banks/:slug',
  },
  {
    page: 'currencies',
    pattern: '/currencies',
  },
  {
    page: 'currency',
    pattern: '/currencies/:slug',
  },
  {
    page: 'converter',
    pattern: '/converter',
  },
  // Admin's pages.
  {
    page: 'admin/banks',
    pattern: '/admin/banks/:action(create)?',
  },
  {
    page: 'admin/bank',
    pattern: '/admin/banks/:slug',
  },
  {
    page: 'admin/currencies',
    pattern: '/admin/currencies/:action(create)?',
  },
  {
    page: 'admin/currency',
    pattern: '/admin/currencies/:slug',
  },
  {
    page: 'admin/parsers',
    pattern: '/parsers/:action(create)?',
  },
  {
    page: 'admin/parser',
    pattern: '/parsers/:id',
  },
  {
    page: 'admin/posts',
    pattern: '/posts/:action(create)?',
  },
  {
    page: 'admin/post',
    pattern: '/posts/:id',
  },
  {
    page: 'admin/quotes',
    pattern: '/quotes/:action(create)?',
  },
  {
    page: 'admin/quote',
    pattern: '/quotes/:id',
  },
];

APP_ROUTES.map((route) => routes.add(route));

module.exports = routes;
