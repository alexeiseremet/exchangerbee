// Load server variables from .env file.
// const dotenv = require('dotenv');

// dotenv.config();

const express = require('express');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');
const { CronJob } = require('cron');

const { utcOffset } = require('./server.config');
const schema = require('./graphql');
const crawler = require('./crawler');
const crawlerOld = require('./crawler/crawlerOld');

const server = express();

const {
  PORT,
  MONGO_URL,
  JWT_SECRET_SERVER,
  NODE_ENV,
  CRAWLER_ON,
} = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

// mongoose.Promise = global.Promise
// Connect to MongoDB with Mongoose.
let timer;

(async function connectToMongoDB() {
  try {
    await mongoose.connect(
      MONGO_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
      },
    );

    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
    clearTimeout(timer);
  } catch {
    // eslint-disable-next-line no-console
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
    timer = setTimeout(connectToMongoDB, 5000);
  }
}());

// Run crawler by cron.
if (CRAWLER_ON === 'true') {
  new CronJob('0 */1 0-2,8-10,13-15 * * *', async () => {
    const data = await crawler();
    console.log('Crawler duration', data.time);
  }, null, true, null, null, false, utcOffset);
}

// Check server token.
server.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const decodedToken = apiKey === JWT_SECRET_SERVER;

  if (!decodedToken) {
    res.status(401).send();
    return undefined;
  }

  return next();
});

// GraphqQL server route.
server.use(
  '/graphql',
  expressGraphql((req) => ({
    schema,
    context: {
      startTime: Date.now(),
      lng: req.query.lng,
      req,
    },
    graphiql: !IS_PRODUCTION,
    pretty: !IS_PRODUCTION,
  })),
);

// Crawler server route.
server.use(
  '/crawler',
  async (req, res, next) => {
    try {
      const data = await crawler();
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

// Old Crawler server route.
server.use(
  '/crawler-old',
  async (req, res, next) => {
    try {
      const { url, xpath } = req.query;
      const data = await crawlerOld(url, xpath);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`🎉  Ready on http://localhost:${PORT}`);
});

module.exports = server;
