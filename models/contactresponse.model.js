const mongoose = require('mongoose');

const ContactRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  budget: {
    type: String,
    required: true,
  },
  brief_info: {
    type: String,
    required: true,
  },
  website_link: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ContactRequest', ContactRequestSchema);
