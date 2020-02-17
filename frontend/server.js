// Load server variables from .env file.
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const proxy = require('http-proxy-middleware');
const next = require('next');
const fetch = require('isomorphic-unfetch');
const jsdom = require('jsdom');

const {
  PORT,
  API_HOST,
  API_KEY,
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

const { JSDOM } = jsdom;

(async () => {
  await app.prepare();

  const server = express();

  // Setup API proxy.
  const appProxy = proxy({
    target: API_HOST,
    cookiePathRewrite: apiPath,
    changeOrigin: true,
    router: {
      [storagePath]: 'https://space.xezoom.com',
    },
    onProxyReq(proxyReq, req) {
      const user = getUserCookie(req);

      if (user) {
        proxyReq.setHeader('authorization', `Bearer ${user.token}`);
      }

      proxyReq.setHeader('x-api-key', API_KEY);
    },
  });

  // Serve static files.
  server
    .use('/service-worker.js', express.static(`${__dirname}/.next/service-worker.js`))
    .use('/robots.txt', express.static(`${__dirname}/public/static/robots.txt`))
    .use('/favicon.ico', express.static(`${__dirname}/public/static/favicon.ico`))
    .use('/manifest.json', express.static(`${__dirname}/public/static/manifest.json`))
    .use('/ads.txt', express.static(`${__dirname}/public/static/ads.txt`))
    .use('/static', express.static(`${__dirname}/public/static`));

  server.get(
    '/jsonwidget',
    async (req, res, next) => {
      try {
        const { lng } = req.query;
        let widgets = {};

        const promises = ['md', 'ro', 'ru', 'ua'].map(url => (
          fetch(`//${url}.xezoom.com/${lng}/widget/top`)
          .then(doc => doc.text())
          .then(html => {
            const htmlAbsUrl = html.split(`/${lng}/`).join(`//${url}.xezoom.com/${lng}/`);
            const dom = new JSDOM(htmlAbsUrl);
            widgets[url] = dom.window.document.querySelector('.widget-top').innerHTML;
          })
        ));

        await Promise.all(promises);
        res.json(widgets);
      } catch (error) {
        next(error);
      }
    });

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
