import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>CRM</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" activeClassName="active">
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/leads" activeClassName="active">
              Leads
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active">
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
