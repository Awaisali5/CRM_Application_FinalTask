const express = require('express');
const auth = require('../Middleware/auth');
const Reminder = require('../Model/Reminder');


// Create a new reminder
// auth
const CreateNewReminder =  async (req, res) => {
    const { task, dueDate } = req.body;
  
    try {
      const newReminder = new Reminder({
        userId: req.user.id,
        task,
        dueDate,
      });
  
      const reminder = await newReminder.save();
      res.json(reminder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  // Get reminders for the logged-in user
//   auth,
  const getReminder =  async (req, res) => {
    try {
      const reminders = await Reminder.find({ userId: req.user.id, notified: false });
      res.json(reminders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  // Mark reminder as notified
//   auth, 

  const MarkReminder = async (req, res) => {
    try {
      let reminder = await Reminder.findById(req.params.id);
  
      if (!reminder) {
        return res.status(404).json({ msg: 'Reminder not found' });
      }
  
      reminder.notified = true;
      await reminder.save();
  
      res.json(reminder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  module.exports = {CreateNewReminder,getReminder,MarkReminder}

