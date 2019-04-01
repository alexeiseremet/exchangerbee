const mongoose = require('mongoose')

const {Schema, model} = mongoose

const institutionSchema = new Schema({
  alias: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
})

module.exports = model('Institution', institutionSchema)
