const mongoose = require('mongoose');
const Lead = require('../Model/Lead')

const OpportunitySchema = new mongoose.Schema({
  opportunityName: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { type: String, enum: ['Qualification', 'Proposal', 'Negotiation', 'Closed'], default: 'Qualification' },
  expectedCloseDate: { type: Date },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);