const express = require('express');
const auth = require('../Middleware/auth');
const Notification = require('../Model/Notification');

// Get notifications for the logged-in user
// auth,
const GetNotification =  async (req, res) => {
    try {
      const notifications = await Notification.find({ userId: req.user.id, read: false });
      res.json(notifications);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  // Mark notification as read
//   auth

  const ReadNotification =  async (req, res) => {
    try {
      let notification = await Notification.findById(req.params.id);
  
      if (!notification) {
        return res.status(404).json({ msg: 'Notification not found' });
      }
  
      notification.read = true;
      await notification.save();
  
      res.json(notification);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  module.exports = {ReadNotification, GetNotification}