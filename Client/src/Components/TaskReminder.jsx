import { useState, useEffect } from 'react';
import { getReminders } from '../Services/notificationService';

const TaskReminder = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      const res = await getReminders();
      setReminders(res.data);
    };
    fetchReminders();
  }, []);

  return (
    <div>
      <h2>Task Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder._id}>{reminder.task} - Due: {new Date(reminder.dueDate).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskReminder;
