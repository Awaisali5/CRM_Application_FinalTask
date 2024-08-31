import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/customers',
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});

export const createCustomer = (customerData) => api.post('/', customerData);
export const getCustomers = () => api.get('/');
export const updateCustomer = (id, customerData) => api.patch(`/${id}`, customerData);
export const deleteCustomer = (id) => api.delete(`/${id}`);
