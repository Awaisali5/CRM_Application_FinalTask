import React from 'react';
// import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="metrics">
        <div className="metric-card">
          <h3>Total Sales</h3>
          <p>$50,000</p>
        </div>
        <div className="metric-card">
          <h3>New Leads</h3>
          <p>25</p>
        </div>
        <div className="metric-card">
          <h3>Pending Tasks</h3>
          <p>7</p>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>Followed up with Lead A - 2 hours ago</li>
          <li>Scheduled a meeting with Client B - 1 day ago</li>
          <li>Updated status of Opportunity C - 3 days ago</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
