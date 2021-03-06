const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  _id: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Url', urlSchema);