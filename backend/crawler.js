// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPad = devices['iPad Pro landscape']

const runCrawler = async (parser) => {
  const startDate = new Date().getTime()
  const {url, quotes} = parser
  const result = {
    quotes: {}
  }

  if (!url) {
    return null
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.WSS_BROWSER
  })
  const page = await browser.newPage()

  await page.emulate(iPad)
  await page.setRequestInterception(true)

  page.on('request', req => {
    if (req.resourceType() === 'font' || req.resourceType() === 'image') {
      req.abort()
    } else {
      req.continue()
    }
  })

  try {
    await page.goto(url, {waitUntil: 'networkidle2'})

    for (let quote of quotes) {
      const {code, xPaths} = quote
      const listOfKeys = Object.keys(xPaths)
      result['quotes'][code] = {}

      for (let key of listOfKeys) {
        const handle = await page.$x(xPaths[key])
        result['quotes'][code][key] = await page.evaluate(el => el.textContent.toLowerCase(), handle[0])

        // Take screenshot.
        // const fileName = url.replace(/([-=.:/%?#])/g, '_')
        // await handle[0].screenshot({
        //   path: `${__dirname}/screenshots/${fileName}_${code}_${key}.jpeg`
        // })
      }
    }
  } catch (err) {
    console.log(`An error occurred on ${url}`)
  } finally {
    await page.close()
  }

  await browser.close()

  result.time = `${Math.round((new Date().getTime() - startDate) / 1000)} s`
  return result
}

module.exports = runCrawler
