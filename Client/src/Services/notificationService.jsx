import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/api/notifications',
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});

export const getReminders = () => api.get('/reminders');
