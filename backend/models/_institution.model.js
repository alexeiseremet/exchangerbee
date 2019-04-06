const mongoose = require('mongoose')

const {Schema, model} = mongoose
const institutionSchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  name: {
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
  logo: String,
  website: String,
})

module.exports = model('Institution', institutionSchema)
