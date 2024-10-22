const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
