// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const express = require('express');
const proxy = require('http-proxy-middleware');
const next = require('next');

const PORT = parseInt(process.env.PORT, 10) || 3050;
const API_HOST = process.env.API_HOST || 'http://localhost:3010';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('./lib/i18n');

const app = next({ dev: !IS_PRODUCTION });
const routes = require('./routes');

const handler = routes.getRequestHandler(app);
const { apiPath, storagePath } = require('./server.config');

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
