// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const express = require('express');
const expressGraphql = require('express-graphql');

const server = express();

const mongoose = require('mongoose');
const schema = require('./graphql');
const runCrawler = require('./crawler/');

const {
  PORT,
  MONGO_URL,
  JWT_SECRET_SERVER,
  NODE_ENV
} = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

// mongoose.Promise = global.Promise
// Connect to MongoDB with Mongoose.
(function connectToMongoDB() {
  let timer;

  mongoose.connect(
    MONGO_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('MongoDB connected');
      clearTimeout(timer);
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
      timer = setTimeout(connectToMongoDB, 5000);
    });
}());

// Check server token.
server.use((req, res, next) => {
  const apiKey = req.headers['X-API-Key'];
  const decodedToken = apiKey === JWT_SECRET_SERVER;

  if (!decodedToken) {
    res.status(401).send();
    return undefined;
  }

  next();
});

// GraphqQL server route.
server.use(
  '/graphql',
  expressGraphql((req) => ({
    schema,
    context: {
      startTime: Date.now(),
      req
    },
    graphiql: !IS_PRODUCTION,
    pretty: true,
  })),
);

// Crawler server route.
server.use(
  '/crawler',
  async (req, res, next) => {
    try {
      const data = await runCrawler();
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
