const express = require('express');

const router = express.Router();

const {CustomerReports,salePerformanceReport} = require('../Controllers/ReportsController')

// Sales performance report
router.get('/sales',salePerformanceReport)

// Customer reports
router.get('/customers',CustomerReports )

module.exports = router;
