const express = require('express');
const auth = require('../middleware/auth');


const {ReadNotification, GetNotification} = require('../Controllers/NotificationController')
const router = express.Router();


// Get notifications for the logged-in user
router.get('/', GetNotification)

// Mark notification as read
router.put('/:id/read',ReadNotification )

module.exports = router;
