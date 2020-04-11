// Load server variables from .env file.
// const dotenv = require('dotenv');
// dotenv.config();

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const iPad = devices['iPad Pro landscape'];

const runCrawlerOld = async (url, xPath) => {
  const startTime = new Date().getTime();

  if (!url && !xPath) {
    return null;
  }

  const result = {
    value: null,
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
    const [elem] = await page.$x(xPath);
    result.value = await page.evaluate((el) => el.textContent.toLowerCase(), elem);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`An error occurred on ${url}`);
  } finally {
    await page.close();
  }

  await browser.close();
  result.time = `${Math.round((new Date().getTime() - startTime) / 1000)} s`;

  return result;
};

module.exports = runCrawlerOld;
