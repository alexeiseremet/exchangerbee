// Load server variables from .env file.
// const dotenv = require('dotenv')
// dotenv.config()

const express = require('express')
const expressGraphql = require('express-graphql')
const server = express()

const mongoose = require('mongoose')
const schema = require('./graphql')

const PORT = parseInt(process.env.PORT, 10)
const MONGO_URL = process.env.MONGO_URL
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// mongoose.Promise = global.Promise
// Connect to MongoDB with Mongoose.
const connectToMongoDB = () => {
  let timer

  mongoose.connect(
    MONGO_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
    .then(() => {
      console.log('MongoDB connected')
      clearTimeout(timer)
    })
    .catch(err => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
      timer = setTimeout(connectToMongoDB, 5000)
    })
}
connectToMongoDB()

// GraphqQL server route.
server
  .use(
    '/graphql',
    expressGraphql({
      schema,
      context: {startTime: Date.now()},
      pretty: true,
      graphiql: !IS_PRODUCTION
    })
  )

server
  .listen(PORT, err => {
    if (err) {
      throw err
    }

    console.log(`🎉  Ready on http://localhost:${PORT}`)
  })

module.exports = server
