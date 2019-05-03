const express = require('express')
const runCrawler = require('./crawler')

const port = parseInt(process.env.PORT, 10) || 3030
const server = express()

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
