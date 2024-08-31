const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Lead = require('../Model/Lead');
const  { createLead, GetAllLeads, UpdateLead,DeleteLead, addOpportunity, updateOpportunity, updateLeadStatus } = require('../Controllers/LeadController')

const router = express.Router();

// Create a new lead
router.post('/createLead', createLead)

// Get all leads (Admin or Manager)
router.get('/getAllLead', GetAllLeads)

// Get leads assigned to a specific Sales Rep
router.get('/my', [auth, role(['sales-rep'])], async (req, res) => {
  try {
    const leads = await Lead.find({ assignedTo: req.user.id });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a lead's status or assign it to a Sales Rep
router.put('/:id', UpdateLead)

// Delete a lead
router.delete('/:id',DeleteLead)

// Add an opportunity to a lead
router.post('/:id/opportunities', addOpportunity)

// Update an opportunity's stage
router.put('/:id/opportunities/:oppId', updateOpportunity)

// new parts 
// Update a lead's status or assign it to a Sales Rep
router.put('/:id',updateLeadStatus )


module.exports = router;
