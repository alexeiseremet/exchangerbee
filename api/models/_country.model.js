const mongoose = require('mongoose')
const {Schema, model} = mongoose

const countrySchema = new Schema({
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
  short_name: {
    type: String,
    required: true,
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true,
  },
})

module.exports = model('Country', countrySchema)
