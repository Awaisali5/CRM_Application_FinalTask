const express = require('express');
const auth = require('../middleware/auth');

const {CreateNewReminder,getReminder,MarkReminder} = require('../Controllers/Reminders')
const router = express.Router();

// Create a new reminder
router.post('/',CreateNewReminder)

// Get reminders for the logged-in user
router.get('/', getReminder)

// Mark reminder as notified
router.put('/:id/notify', MarkReminder)

module.exports = router;
