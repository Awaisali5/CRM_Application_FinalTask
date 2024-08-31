import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../index.css'

const HomePage = () => {
  return (
    <>
      
      <main className="home">
        <section className="hero">
          <h1>Welcome to the CRM Dashboard</h1>
          <p>Manage your customers, leads, and sales pipeline with ease.</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>
      
    </>
  );
};

export default HomePage;
