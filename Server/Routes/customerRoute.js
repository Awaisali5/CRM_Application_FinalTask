
const express = require('express');
const auth = require('../Middleware/auth');
const role = require('../Middleware/Role');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer, searchCustomer, addinteraction, getInteraction } = require('../Controllers/customerController')


const router = express.Router();

// Create a new customer (Admin or Sales Rep)
router.post('/createCustomer',createCustomer )

// Get all customers (Admin or Manager)
router.get('/getallCustomer', getCustomers)

// Get customers by Sales Rep (Sales Rep)
router.get('/my', [auth, role(['sales-rep'])], async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.id });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a customer (Admin or Sales Rep)
router.put('/:id',updateCustomer )

// Delete a customer (Admin or Sales Rep)
router.delete('/:id',deleteCustomer)

// Search and filter customers by name, company, or industry
router.get('/search', searchCustomer)


// Add an interaction log to a customer
router.post('/:id/interactions',addinteraction)
// Get interaction logs for a customer
router.get('/:id/interactions',getInteraction)


module.exports = router;




