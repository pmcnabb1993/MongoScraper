const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
  user_id: {
    type: Number,
    trim: true,
    required: true
  },
  article_id: {
    type: Number,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('comment', Comment);