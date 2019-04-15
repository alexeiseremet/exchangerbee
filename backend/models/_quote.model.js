const mongoose = require('mongoose')

const {Schema, model} = mongoose
const {ObjectId} = Schema.Types

const quoteSchema = new Schema({
  slug: {
    type: String,
    index: true,
    unique: true,
    required: true,
    trim: true,
  },
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
  createdAt: {
    type: Date,
    index: true,
    required: true,
    trim: true,
  },
  currency: {
    type: String,
    ref: 'Currency',
    required: true,
  },
  baseCurrency: {
    type: String,
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
  updatedAt: {
    type: Date,
    trim: true,
  },
  period: {
    type: String,
    trim: true,
  },
})

module.exports = model('Quote', quoteSchema)
