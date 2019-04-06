const mongoose = require('mongoose')

const {Schema, model} = mongoose
const countrySchema = new Schema({
  currencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  numCode: {
    type: Number,
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
