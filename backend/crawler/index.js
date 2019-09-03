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
  const {
    id, institution, period, url, quotes,
  } = allParser[0] || {};

  if (!url) {
    return null;
  }

  const result = {
    quotes: [],
    time: '0s',
  };

  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.WSS_BROWSER,
  });
  const page = await browser.newPage();

  await page.emulate(iPad);
  await page.setRequestInterception(true);

  page.on('request', (req) => {
    if (req.resourceType() === 'font' || req.resourceType() === 'image') {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const getXPathValue = async (key, xPath, quoteIndex) => {
      const handle = await page.$x(xPath);

      result.quotes[quoteIndex][key] = (
        await page.evaluate((el) => el.textContent.toLowerCase(), handle[0])
      );

      // Take screenshot.
      // const fileName = url.replace(/([-=.:/%?#])/g, '_')
      // await handle[0].screenshot({
      //   path: `${__dirname}/screenshots/${fileName}_${currency.refSlug}_${key}.jpeg`
      // })
    };

    let promiseAllxPaths = [];

    quotes.forEach((quote, quoteIndex) => {
      const { amount, currency, xPaths } = quote;
      const xPathsKeys = Object.keys(xPaths);

      result.quotes[quoteIndex] = {
        institution,
        currency,
        amount,
        period,
      };

      promiseAllxPaths = xPathsKeys.map((key) => getXPathValue(key, xPaths[key], quoteIndex));
    });

    await Promise.all(promiseAllxPaths);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`An error occurred on ${url}`);
  } finally {
    await page.close();
  }

  await browser.close();
  result.time = `${Math.round((new Date().getTime() - startDate) / 1000)} s`;

  await createUpdateQuotes(result.quotes);
  await updateParser(id);

  return result;
};

module.exports = runCrawler;
