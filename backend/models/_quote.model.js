const mongoose = require('mongoose')

const {Schema, model} = mongoose
const quoteSchema = new Schema({
  institution: {
    type: String,
    ref: 'Institution',
    index: true,
    required: true,
  },
  date: {
    type: Date,
    index: true,
    required: true,
    trim: true,
  },
  currency: {
    type: String,
    ref: 'Currency',
    index: true,
    required: true,
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
    trim: true,
  },
  error: {
    type: Boolean,
    trim: true,
  },
})

module.exports = model('Quote', quoteSchema)
