const mongoose = require('mongoose')
const express = require('express')
const expressGraphql = require('express-graphql')
const schema = require('./graphql')
const runCrawler = require('./crawler')

const port = parseInt(process.env.PORT, 10) || 4000
const server = express()

// mongoose.Promise = global.Promise

// Connect to MongoDB with Mongoose.
mongoose.connect(
  'mongodb://exbee:00Exchangerbee@ds139890.mlab.com:39890/exbee',
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// GraphqQL server route.
server
  .use(
    '/graphql',
    expressGraphql({
      schema,
      context: {startTime: Date.now()},
      pretty: true,
      graphiql: true
    })
  )

const parser = {
  url: 'http://bnm.md/ro/content/ratele-de-schimb',
  quotes: [
    {
      code: 'usd',
      xPaths: {
        bid: '//*[@id="ajax-wrapper-table"]/div[1]/div[1]/table[2]/tbody/tr[12]/td[5]/div/span',
        ask: '//*[@id="ajax-wrapper-table"]/div[1]/div[1]/table[2]/tbody/tr[12]/td[5]/div/span',
        currency: '//*[@id="ajax-wrapper-table"]/div[1]/div[1]/table[2]/tbody/tr[12]/td[3]',
      }
    },
    {
      code: 'eur',
      xPaths: {
        bid: '//*[@id="ajax-wrapper-table"]/div[1]/div[1]/table[2]/tbody/tr[17]/td[5]/div/span',
        ask: '//*[@id="ajax-wrapper-table"]/div[1]/div[1]/table[2]/tbody/tr[17]/td[5]/div/span',
        currency: '//*[@id="ajax-wrapper-table"]/div[1]/div[1]/table[2]/tbody/tr[17]/td[3]',
      }
    },
  ]
}

// Crawler server route.
server
  .use(
    '/crawler',
    async (req, res, next) => {
      try {
        const data = await runCrawler(parser)
        res.json(data)
      } catch (error) {
        next(error)
      }
    }
  )

server
  .listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`🎉  Ready on http://localhost:${port}.`)
  })

module.exports = server
