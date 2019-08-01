// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPad = devices['iPad Pro landscape'];

const getParser = require('./crawlerGetParser');
const createUpdateQuotes = require('./crawlerCreateUpdateQuotes');
const updateParser = require('./crawlerUpdateParser');

const runCrawler = async () => {
  const startDate = new Date().getTime();
  const { data: { allParser } } = await getParser();
  const { id, institution, period, url, quotes } = allParser[0] || {};
  const result = {
    quotes: []
  };

  if (!url) {
    return null
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.WSS_BROWSER
  });
  const page = await browser.newPage();

  await page.emulate(iPad);
  await page.setRequestInterception(true);

  page.on('request', req => {
    if (req.resourceType() === 'font' || req.resourceType() === 'image') {
      req.abort()
    } else {
      req.continue()
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    for (let quote of quotes) {
      const { amount, currency, xPaths } = quote;
      const listOfKeys = Object.keys(xPaths);
      const parsedItem = {
        institution,
        currency,
        amount,
        period,
      };

      for (let key of listOfKeys) {
        const handle = await page.$x(xPaths[key]);
        parsedItem[key] = await page.evaluate(el => el.textContent.toLowerCase(), handle[0])

        // Take screenshot.
        // const fileName = url.replace(/([-=.:/%?#])/g, '_')
        // await handle[0].screenshot({
        //   path: `${__dirname}/screenshots/${fileName}_${currency.refSlug}_${key}.jpeg`
        // })
      }

      result['quotes'].push(parsedItem)
    }
  }
  catch (e) {
    console.error(`An error occurred on ${url}`)
  } finally {
    await page.close()
  }

  await browser.close();
  result.time = `${Math.round((new Date().getTime() - startDate) / 1000)} s`;

  await createUpdateQuotes(result.quotes);
  await updateParser(id);

  return result
};

module.exports = runCrawler;
