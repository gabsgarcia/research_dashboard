// app/javascript/components/App.jsx
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/research_projects')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Dashboard projects={projects} />
      </main>
    </div>
  );
};

export default App;
