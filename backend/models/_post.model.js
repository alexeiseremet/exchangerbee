const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const postSchema = new Schema({
  slug: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  heading: {
    type: String,
    trim: true,
  },
  textFirst: {
    type: String,
    trim: true,
  },
  textSecond: {
    type: String,
    trim: true,
  },
});

module.exports = model('Post', postSchema);
