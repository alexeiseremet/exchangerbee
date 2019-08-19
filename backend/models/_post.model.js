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
  textFirst: {
    type: String,
  },
  textSecond: {
    type: String,
  },
});

module.exports = model('Post', postSchema);
