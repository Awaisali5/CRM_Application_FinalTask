const mongoose = require('mongoose');
const User = require('../Model/userModel')

const LeadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  source: { type: String },
  status: { type: String, enum: ['New', 'In Progress', 'Converted', 'Lost'], default: 'New' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
});

module.exports = mongoose.model('Lead', LeadSchema);



