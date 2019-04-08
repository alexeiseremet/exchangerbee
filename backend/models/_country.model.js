const mongoose = require('mongoose')

const {Schema, model} = mongoose
const countrySchema = new Schema({
  currency: {
    type: String,
    ref: 'Currency',
    required: true,
  },
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
  shortName: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
  },
})

module.exports = model('Country', countrySchema)
