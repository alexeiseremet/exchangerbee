const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const translationSchema = new Schema({
  locale: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  model: {
    refId: {
      type: String,
      ref: 'Institution',
      required: true,
      index: true,
    },
    refSlug: {
      type: String,
      trim: true,
    },
    refType: {
      type: String,
      trim: true,
    },
  },
  fields: {
    name: {
      type: String,
      trim: true,
    },
    symbol: {
      type: String,
      trim: true,
    },
  },
});

module.exports = model('Translation', translationSchema);
