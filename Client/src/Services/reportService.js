import axios from 'axios';

const api = axios.create({
  baseURL: '/api/reports',
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});

export const getSalesReport = () => api.get('/sales');
