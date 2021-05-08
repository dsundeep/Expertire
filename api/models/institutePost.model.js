const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  instituteId: {
    type: 'String',
    trim: true
  },
  title: {
    type: 'String',
    trim: true
  },
  message: {
    type: 'String',
    trim: true
  },
  status: {
    type: 'String',
    trim: true
  }
});

module.exports = mongoose.model('institutePost', postSchema, 'institutePost');