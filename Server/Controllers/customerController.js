const Customer = require('../Model/CustomerModel')
const auth = require('../Middleware/auth');
const role = require('../Middleware/Role');



// Creating Customer 

const createCustomer = async (req, res) => {
    const { name, contactInfo, company, address, industry, notes } = req.body;
    try {
      const customer = new Customer({ 
        name, contactInfo, company, address, industry, notes, 
        createdBy: req.user.id 
      });
      await customer.save();
      res.json(customer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // , async (req, res) => {
  //   const { name, contactInfo, company, address, industry, notes } = req.body;
  
  //   try {
  //     const newCustomer = new Customer({
  //       name,
  //       contactInfo,
  //       company,
  //       address,
  //       industry,
  //       notes,
  //       createdBy: req.user.id,
  //     });
  
  //     const customer = await newCustomer.save();
  //     res.json(customer);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server error');
  //   }
  // });

  


// Get All Customers 
const getCustomers = async (req, res) => {
    try {
      
      const customers = await Customer.find({ createdBy: req.user.id });
      res.json(customers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // get all representative 
  


  // [auth, role(['admin', 'manager'])], async (req, res) => {
  //   try {
  //     const customers = await Customer.find().populate('createdBy', 'name email');
  //     res.json(customers);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server error');
  //   }
  // });


//   Update Customer 
const updateCustomer = async (req, res) => {
  const { name, contactInfo, company, address, industry, notes } = req.body;

  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Ensure the Sales Rep can only update their own customers
    if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: { name, contactInfo, company, address, industry, notes } },
      { new: true }
    );

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



//   Delete Customer 
const deleteCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Ensure the Sales Rep can only delete their own customers
    if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Customer.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Search and filter customers by name, company, or industry
const searchCustomer = async (req, res) => {
  const { name, company, industry } = req.query;

  try {
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (company) query.company = new RegExp(company, 'i');
    if (industry) query.industry = new RegExp(industry, 'i');

    const customers = await Customer.find(query);
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add an interaction log to a customer
// [auth, role(['admin', 'sales-rep'])],

const addinteraction =  async (req, res) => {
  const { interactionType, date, time, description } = req.body;

  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    const newInteraction = { interactionType, date, time, description };

    customer.interactions.push(newInteraction);
    await customer.save();

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get interaction logs for a customer
// [auth],
const getInteraction =  async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id).select('interactions');
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    res.json(customer.interactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


  module.exports = { createCustomer, getCustomers, updateCustomer, deleteCustomer, searchCustomer, addinteraction, getInteraction };



