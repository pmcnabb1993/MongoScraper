var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  source: {
    type: String,
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
},
{ timestamps: true });

var Headline = mongoose.model('Headline', HeadlineSchema);

module.exports = Headline
