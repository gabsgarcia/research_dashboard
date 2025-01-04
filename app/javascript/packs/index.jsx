import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/App';
import '../stylesheets/application.css'; // Assuming you have a CSS file here

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('research-dashboard-app');

  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
});
