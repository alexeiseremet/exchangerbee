// Load server variables from .env file.
// const dotenv = require('dotenv');

// dotenv.config();

const express = require('express');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');
const { CronJob } = require('cron');

const { timezone } = require('./server.config');
const schema = require('./graphql');
const crawler = require('./crawler');

const server = express();

const {
  PORT,
  MONGO_URL,
  JWT_SECRET_SERVER,
  NODE_ENV,
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
new CronJob('0 */1 0-1,8-10,13-14 * * *', async () => {
  const data = await crawler();
  console.log('Crawler duration', data.time);
}, null, true, timezone);

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

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`🎉  Ready on http://localhost:${PORT}`);
});

module.exports = server;
