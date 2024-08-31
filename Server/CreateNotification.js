const Notification = require('../models/Notification');

async function createNotification(userId, message) {
  const newNotification = new Notification({ userId, message });
  await newNotification.save();
}
