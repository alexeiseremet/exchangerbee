// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const express = require('express');
const proxy = require('http-proxy-middleware');
const next = require('next');

const PORT = parseInt(process.env.PORT, 10) || 3050;
const API_HOST = process.env.API_HOST|| 'http://backend:3010';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('./lib/i18n');

const app = next({ dev: !IS_PRODUCTION });
const routes = require('./routes');
const handler = routes.getRequestHandler(app);
const { apiPath, storagePath } = require('./server.config');

app.prepare().then(() => {
  const server = express();

  // Setup API proxy.
  const appProxy = proxy({
    target: API_HOST,
    cookiePathRewrite: apiPath,
    changeOrigin: true,
    router: {
      [storagePath]: 'http://exchangerbee.com',
    }
  });

  // Serve static files.
  server
    .use('/robots.txt', express.static(`${__dirname}/static/robots.txt`))
    .use('/favicon.ico', express.static(`${__dirname}/static/favicon.ico`));

  server
    .use([apiPath, storagePath], appProxy)
    .use(nextI18NextMiddleware(nextI18next))
    .use(handler)
    .listen(PORT, err => {
      if (err) {
        throw err;
      }

      console.log(`🎉  Ready on http://localhost:${PORT}`);
    });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});

//
// router.get('/', function (req, res) {
//   var domain = req.get('host').match(/\w+/); // e.g., host: "subdomain.website.com"
//   if (domain)
//     var subdomain = domain[0]; // Use "subdomain"
// });
