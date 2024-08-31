const Lead = require('../Model/Lead')

// create Lead 
// [auth, role(['admin', 'sales-rep'])], 
const createLead =async (req, res) => {
    const { leadName, contactInfo, source, assignedTo } = req.body;
  
    try {
      const newLead = new Lead({
        leadName,
        contactInfo,
        source,
        assignedTo,
        createdBy: req.user.id,
      });
  
      const lead = await newLead.save();
      res.json(lead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  // Get all leads (Admin or Manager)
//   [auth, role(['admin', 'manager'])],
  const GetAllLeads =  async (req, res) => {
    try {
      const leads = await Lead.find().populate('assignedTo', 'name email').populate('createdBy', 'name email');
      res.json(leads);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

// Update a lead's status or assign it to a Sales Rep
// [auth, role(['admin', 'sales-rep'])],

const UpdateLead =  async (req, res) => {
    const { status, assignedTo } = req.body;
  
    try {
      let lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ msg: 'Lead not found' });
      }
  
      if (lead.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      lead = await Lead.findByIdAndUpdate(req.params.id, { $set: { status, assignedTo } }, { new: true });
      res.json(lead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  // Delete a lead
//   [auth, role(['admin', 'sales-rep'])],

const DeleteLead =   async (req, res) => {
    try {
      let lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ msg: 'Lead not found' });
      }
  
      if (lead.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await Lead.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Lead removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  // Add an opportunity to a lead
//   [auth, role(['admin', 'sales-rep'])],

  const addOpportunity = async (req, res) => {
    const { opportunityName, value, stage, expectedCloseDate } = req.body;
  
    try {
      let lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ msg: 'Lead not found' });
      }
  
      const newOpportunity = { opportunityName, value, stage, expectedCloseDate };
  
      lead.opportunities.push(newOpportunity);
      await lead.save();
  
      res.json(lead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  // Update an opportunity's stage
//   [auth, role(['admin', 'sales-rep'])],

const updateOpportunity =  async (req, res) => {
    const { stage } = req.body;
  
    try {
      let lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ msg: 'Lead not found' });
      }
  
      const opportunity = lead.opportunities.id(req.params.oppId);
      if (!opportunity) {
        return res.status(404).json({ msg: 'Opportunity not found' });
      }
  
      opportunity.stage = stage;
      await lead.save();
  
      res.json(lead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  // Update a lead's status or assign it to a Sales Rep

//   [auth, role(['admin', 'sales-rep'])],

  const updateLeadStatus = async (req, res) => {
    const { status, assignedTo } = req.body;
  
    try {
      let lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ msg: 'Lead not found' });
      }
  
      lead = await Lead.findByIdAndUpdate(req.params.id, { $set: { status, assignedTo } }, { new: true });
  
      // Notify the assigned sales rep about the lead status change
      createNotification(lead.assignedTo, `Lead ${lead.leadName} status changed to ${status}`);
  
      res.json(lead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  module.exports = { createLead, GetAllLeads, UpdateLead,DeleteLead, addOpportunity, updateOpportunity, updateLeadStatus };

  
  