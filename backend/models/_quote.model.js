const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const quoteSchema = new Schema({
  institution: {
    refId: {
      type: String,
      ref: 'Institution',
      index: true,
      required: true,
    },
    refSlug: {
      type: String,
    },
  },
  currency: {
    refId: {
      type: String,
      ref: 'Currency',
      required: true,
    },
    refSlug: {
      type: String,
      index: true,
    },
  },
  date: {
    type: Date,
    index: true,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
    trim: true,
  },
  ask: {
    type: String,
    required: true,
    trim: true,
  },
  bid: {
    type: String,
    required: true,
    trim: true,
  },
  period: {
    type: String,
    required: true,
    trim: true,
  },
  error: {
    type: String,
    trim: true,
  },
});

quoteSchema.virtual('currencyVObj', {
  ref: 'Currency',
  localField: 'currency.refId',
  foreignField: '_id',
  justOne: true,
});

quoteSchema.virtual('institutionVObj', {
  ref: 'Institution',
  localField: 'institution.refId',
  foreignField: '_id',
  justOne: true,
});


module.exports = model('Quote', quoteSchema);
