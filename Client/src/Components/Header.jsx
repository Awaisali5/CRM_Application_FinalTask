import React from 'react';
import Dashboard from './Dashboard'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <div className="logo">CRM Dashboard</div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#customers">Customers</a></li>
          <li><a href="#leads">Leads</a></li>
          <li><a href="#reports">Reports</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
