const mongoose = require('mongoose');
const User = require('../Model/userModel')

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  notified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
