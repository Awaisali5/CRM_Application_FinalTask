import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/api/leads',
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});

export const createLead = (leadData) => api.post('/', leadData);
export const getLeads = () => api.get('/');
export const updateLead = (id, leadData) => api.put(`/${id}`, leadData);
export const deleteLead = (id) => api.delete(`/${id}`);
