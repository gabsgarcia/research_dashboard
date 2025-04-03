import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import ProjectDetails from './ProjectDetails';
import WelcomeBanner from './WelcomeBanner';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if we're on a project details page
  const projectMatch = window.location.pathname.match(/^\/projects\/(\d+)$/);
  const isProjectDetailsPage = !!projectMatch;
  const projectId = projectMatch ? projectMatch[1] : null;

  useEffect(() => {
    // Set up CSRF token for axios
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
      axios.defaults.headers.common['X-CSRF-Token'] = token;
    }

    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/users/check_logged_in');
        setIsLoggedIn(response.data.logged_in);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="container mt-4">
        <WelcomeBanner isLoggedIn={false} />
        <div className="text-center mt-5">
          <h2>Welcome to Research Dashboard</h2>
          <p>Please sign in to access your research projects.</p>
          <a href="/users/sign_in" className="btn btn-primary">Sign In</a>
        </div>
      </div>
    );
  }

  // If on project details page, render ProjectDetails component
  if (isProjectDetailsPage) {
    return (
      <div className="container mt-4">
        <ProjectDetails />
      </div>
    );
  }

  // Otherwise render the dashboard
  return (
    <div className="container mt-4">
      <WelcomeBanner isLoggedIn={true} />
      <Dashboard />
    </div>
  );
};

export default App;
