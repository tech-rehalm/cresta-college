import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Date: {
    type: Date,
    required: true
  },
  EventLocation: {
    type: String,
    required: true,
    trim: true
  },
  EventAudience: {
    type: String,
    enum: ['Staff', 'Students', 'Parents', 'Public', 'All'], // Added 'All' option
    required: true
  },
  Description: {
    type: String,
    trim: true
  },
  Organizer: {
    type: String,
    required: true,
    trim: true
  },
  EventType: {
    type: String,
    enum: ['Conference', 'Workshop', 'Seminar', 'Competition', 'Celebration', 'Sports', 'Other'],
    default: 'Other'
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to automatically update the 'UpdatedAt' field on save
eventSchema.pre('save', function(next) {
  this.UpdatedAt = Date.now();
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event

