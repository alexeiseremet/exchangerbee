const mongoose = require('mongoose')

const {Schema, model} = mongoose
const {ObjectId } = Schema.Types
const countrySchema = new Schema({
  currency: {
    type: ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
  },
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
  shortName: {
    type: String,
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
})

module.exports = model('Country', countrySchema)
