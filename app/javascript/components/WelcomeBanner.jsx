import React from 'react';

const WelcomeBanner = ({ isLoggedIn }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #4a90e2, #8e44ad)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2>Welcome to Research Dashboard</h2>
      <p>{isLoggedIn ? 'Manage your research projects efficiently' : 'Please sign in to access your dashboard'}</p>
    </div>
  );
};

export default WelcomeBanner;
