// Load server variables from .env file.
const dotenv = require('dotenv')
dotenv.config()
const {join} = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware')
const next = require('next')

const nextI18NextMiddleware = require('next-i18next/middleware')
const nextI18next = require('./lib/i18n')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const routes = require('./routes')
const handler = routes.getRequestHandler(app)
const {apiPath, storagePath} = require('./server.config')
const port = parseInt(process.env.PORT, 10) || 8080




app.prepare()
  .then(() => {
    const server = express()

    // Setup API proxy.
    const appProxy = proxy({
      target: process.env.API_HOST || 'http://localhost:4000/',
      cookiePathRewrite: apiPath,
      changeOrigin: true,
      router: {
        [storagePath]: 'http://exchangerbee.com',
      }
    })

    // Serve static files.
    server
      .use('/robots.txt', express.static(join(__dirname, '/static/robots.txt')))
      .use('/favicon.ico', express.static(join(__dirname, '/static/favicon.ico')))

    server
      .use(nextI18NextMiddleware(nextI18next))
      .use([apiPath, storagePath], appProxy)
      .use(handler)
      .listen(port, err => {
        if (err) {
          throw err
        }

        console.log(`🎉  Ready on http://localhost:${port}`)
      })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
