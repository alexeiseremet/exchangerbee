const mongoose = require('mongoose')

const {Schema, model} = mongoose
const institutionSchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
    trim: true,
  },
  name: {
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
  logo: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
})

module.exports = model('Institution', institutionSchema)
