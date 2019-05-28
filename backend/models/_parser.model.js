const mongoose = require('mongoose')

const {Schema, model} = mongoose
const parserSchema = new Schema({
  institution: {
    refId: {
      type: String,
      ref: 'Institution',
      index: true,
      required: true,
    },
    refSlug: {
      type: String,
    }
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
      refId: {
        type: String,
        ref: 'Currency',
        unique: true,
        required: true,
      },
      refSlug: {
        type: String,
        index: true,
      }
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
