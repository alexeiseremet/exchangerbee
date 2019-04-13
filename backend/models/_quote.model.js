const mongoose = require('mongoose')

const {Schema, model} = mongoose
const {ObjectId, Date } = Schema.Types
const quoteSchema = new Schema({
  country: {
    type: ObjectId,
    ref: 'Country',
    index: true,
    required: true,
    trim: true,
  },
  institution: {
    type: ObjectId,
    ref: 'Institution',
    index: true,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  currency: {
    type: ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
  },
  baseCurrency: {
    type: ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
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
  updateDate: {
    type: Date,
    trim: true,
  },
  period: {
    type: String,
    trim: true,
  },
})

module.exports = model('Quote', quoteSchema)
