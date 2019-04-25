const mongoose = require('mongoose')

const {Schema, model} = mongoose
const {ObjectId} = Schema.Types

const institutionSchema = new Schema({
  slug: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
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
