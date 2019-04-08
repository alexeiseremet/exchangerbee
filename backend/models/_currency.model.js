const mongoose = require('mongoose')

const {Schema, model} = mongoose
const currencySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  numCode: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
  },
  symbol: String,
})

module.exports = model('Currency', currencySchema)
