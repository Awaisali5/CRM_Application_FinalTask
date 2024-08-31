const express = require('express');
const auth = require('../Middleware/auth');
const role = require('../Middleware/Role');
const Lead = require('../Model/Lead');
const Customer = require('../Model/CustomerModel');

// Sales performance report
// [auth, role(['admin', 'manager'])]

const salePerformanceReport =  async (req, res) => {
    try {
      const salesData = await Lead.aggregate([
        { $unwind: '$opportunities' },
        {
          $group: {
            _id: '$assignedTo',
            totalSales: { $sum: '$opportunities.value' },
            conversionRate: { $avg: { $cond: [{ $eq: ['$status', 'Converted'] }, 1, 0] } },
            averageDealSize: { $avg: '$opportunities.value' },
            salesCycleLength: { $avg: { $subtract: ['$opportunities.expectedCloseDate', '$createdAt'] } },
          },
        },
      ]);
  
      res.json(salesData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  // Customer reports
//   [auth, role(['admin', 'manager'])],

  const CustomerReports = async (req, res) => {
    try {
      const customerData = await Customer.aggregate([
        {
          $group: {
            _id: null,
            newCustomers: { $sum: { $cond: [{ $gt: ['$createdAt', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] }, 1, 0] } },
            retentionRate: { $avg: { $cond: [{ $gt: ['$updatedAt', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] }, 1, 0] } },
            interactionFrequency: { $avg: { $size: '$interactions' } },
          },
        },
      ]);
  
      res.json(customerData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  module.exports = {CustomerReports,salePerformanceReport}

