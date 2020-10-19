const mongoose = require('mongoose');

const { Schema, model } = mongoose;
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
  category: {
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
});

institutionSchema.virtual('translationVObj', {
  ref: 'Translation',
  localField: '_id',
  foreignField: 'model.refId',
  justOne: true,
});

module.exports = model('Institution', institutionSchema);
