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
  {
    page: 'widgets',
    pattern: '/widgets',
  },
  // Admin's pages.
  {
    page: 'admin/login',
    pattern: '/admin/login',
  },
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
    pattern: '/admin/parsers/:action(create)?',
  },
  {
    page: 'admin/parser',
    pattern: '/admin/parsers/:id',
  },
  {
    page: 'admin/posts',
    pattern: '/admin/posts/:action(create)?',
  },
  {
    page: 'admin/post',
    pattern: '/admin/posts/:id',
  },
  {
    page: 'admin/quotes',
    pattern: '/admin/quotes/:action(create)?',
  },
  {
    page: 'admin/quote',
    pattern: '/admin/quotes/:id',
  },
  // Global's pages.
  {
    page: 'global/main',
    pattern: '/global',
  },
  {
    page: 'global/country',
    pattern: '/global/countries/:slug',
  },
];

APP_ROUTES.map((route) => routes.add(route));

module.exports = routes;
