const mongoose = require('mongoose')

const {Schema, model} = mongoose
const quoteSchema = new Schema({
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
  date: {
    type: Date,
    index: true,
    required: true,
    trim: true,
  },
  currency: {
    refId: {
      type: String,
      ref: 'Currency',
      required: true,
    },
    refSlug: {
      type: String,
      index: true,
    }
  },
  amount: {
    type: String,
    required: true,
    trim: true,
  },
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
  period: {
    type: String,
    required: true,
    trim: true,
  },
  error: {
    type: Boolean,
    trim: true,
  },
})

module.exports = model('Quote', quoteSchema)
