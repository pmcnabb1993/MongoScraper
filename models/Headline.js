const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Headline = new Schema({
  title: {
    type: String,
    trim: true,
    unqique: true,
    required: true
  },
  author: {
    type: String,
    trim: true,
    required: true
  },
  summary: {
    type: String,
    trim: true,
    required: true
  },
  link: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  created_at: {
    type: Date
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

module.exports = mongoose.model('Headline', headline);