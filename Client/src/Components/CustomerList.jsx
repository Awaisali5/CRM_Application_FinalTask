import { useState, useEffect } from 'react';
import { getCustomers } from '../Services/customerService';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await getCustomers();
      setCustomers(res.data);
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>{customer.name} - {customer.company}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
