const mongoose = require('mongoose')

const {Schema, model} = mongoose
const currencySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  numCode: {
    type: String,
    index: true,
    unique: true,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
    trim: true,
  },
  symbol: {
    type: String,
    trim: true,
  },
})

module.exports = model('Currency', currencySchema)
