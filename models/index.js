const mongoose = require('mongoose');

module.exports = {
  User: require('./user.js'),
  Article: require('./headline.js'),
  Comment: require('./comment.js')
};