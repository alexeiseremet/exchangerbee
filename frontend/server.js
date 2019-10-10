// Load server variables from .env file.
// const dotenv = require('dotenv');
// dotenv.config();

const express = require('express');
const proxy = require('http-proxy-middleware');
const next = require('next');

const {
  PORT = 3050,
  API_HOST = 'http://localhost:3010',
  API_KEY = 'browser',
  NODE_ENV,
} = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('./lib/i18n');

const app = next({ dev: !IS_PRODUCTION });
const routes = require('./routes');

const handler = routes.getRequestHandler(app);
const { apiPath, storagePath } = require('./server.config');
const { getUserCookie } = require('./lib/session');

(async () => {
  await app.prepare();

  const server = express();

  // Setup API proxy.
  const appProxy = proxy({
    target: API_HOST,
    cookiePathRewrite: apiPath,
    changeOrigin: true,
    router: {
      [storagePath]: 'http://xezoom.com',
    },
    onProxyReq(proxyReq, req) {
      const user = getUserCookie(req);

      if (user) {
        proxyReq.setHeader('Authorization', `Bearer ${user.token}`);
      }

      proxyReq.setHeader('X-API-Key', API_KEY);
    },
  });

  // Serve static files.
  server
    .use('/robots.txt', express.static(`${__dirname}/static/robots.txt`))
    .use('/favicon.ico', express.static(`${__dirname}/static/favicon.ico`));

  server
    .use([apiPath, storagePath], appProxy)
    .use(nextI18NextMiddleware(nextI18next))
    .use(handler);

  await server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`🎉  Ready on http://localhost:${PORT}`);
  });
})();

//
// router.get('/', function (req, res) {
//   var domain = req.get('host').match(/\w+/); // e.g., host: "subdomain.website.com"
//   if (domain)
//     var subdomain = domain[0]; // Use "subdomain"
// });
