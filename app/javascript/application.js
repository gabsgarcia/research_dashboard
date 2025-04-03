import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

/**
 * This is the main entry point for the React application.
 * It waits for the DOM to load, then mounts the React app
 * to the appropriate container element.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing React application');

  // Find the container element where React will be mounted
  const container = document.getElementById('research-dashboard-app');

  // Only attempt to mount React if the container exists
  if (container) {
    try {
      // Create a React root and render the App component
      console.log('Found container, mounting App component');
      const root = createRoot(container);
      root.render(React.createElement(App));
      console.log('React application mounted successfully');
    } catch (error) {
      // Log any errors that occur during mounting
      console.error('Error mounting React application:', error);
    }
  } else {
    // Log a warning if the container doesn't exist
    console.warn('Container #research-dashboard-app not found in the DOM');
  }
});
