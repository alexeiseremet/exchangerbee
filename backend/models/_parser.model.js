const mongoose = require('mongoose')

const {Schema, model} = mongoose
const parserSchema = new Schema({
  institution: {
    type: String,
    ref: 'Institution',
    required: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  period: {
    type: String,
    index: true,
    required: true,
    trim: true,
  },
  processedAt: {
    type: Date,
    index: true,
    trim: true,
  },
  quotes: [{
    amount: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      ref: 'Currency',
      required: true,
    },
    xPaths: {
      ask: {
        type: String,
        required: true,
        trim: true,
      },
      bid: {
        type: String,
        required: true,
        trim: true,
      },
      code: {
        type: String,
        trim: true,
      },
    },
  }],
})

module.exports = model('Parser', parserSchema)
