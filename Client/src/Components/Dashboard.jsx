import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import TaskReminder from './TaskReminder';
import SalesReport from './SalesReport';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <div>
        <h3>Reminders</h3>
        <TaskReminder />
      </div>
      <div>
        <h3>Sales Report</h3>
        <SalesReport />
      </div>
    </div>
  );
};

export default Dashboard;
