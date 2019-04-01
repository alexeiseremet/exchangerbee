const mongoose = require('mongoose')
const {Schema, model} = mongoose

const currencySchema = new Schema({
  numeric_code: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
  alias: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: String,
})

module.exports = model('Currency', currencySchema)
