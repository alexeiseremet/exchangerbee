const mongoose = require('mongoose')
const express = require('express')
const expressGraphql = require('express-graphql')
const schema = require('./graphql')

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
    expressGraphql(() => ({
      schema,
      context: { startTime: Date.now() },
      pretty: true,
      graphiql: true
    }))
  )

server
  .listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`🎉  Ready on http://localhost:${port}/graphql`)
  })

module.exports = server
