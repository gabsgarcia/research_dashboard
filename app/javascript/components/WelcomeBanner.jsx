// app/javascript/components/WelcomeBanner.jsx
import React from 'react';

const WelcomeBanner = () => {
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
      <h2>Welcome to React Dashboard!</h2>
      <p>This banner is rendered by React</p>
    </div>
  );
};

export default WelcomeBanner;
