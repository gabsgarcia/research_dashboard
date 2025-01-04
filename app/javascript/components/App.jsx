// app/javascript/components/App.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set up CSRF token for axios
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
      axios.defaults.headers.common['X-CSRF-Token'] = token;
    }

    // Simple function to fetch projects
    const fetchProjects = async () => {
      try {
        console.log('Fetching research projects...');
        const response = await axios.get('/api/research_projects');
        console.log('Projects data:', response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Check the console for details.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle navigation to project details
  const handleViewDetails = (projectId) => {
    window.location.href = `/projects/${projectId}`;
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="display-5 fw-bold">Research Dashboard</h1>
      </header>

      <div className="row">
        <div className="col-12 mb-4">
          <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Welcome to Research Dashboard</h1>
              <p className="col-md-8 fs-4">
                Track and manage your research projects efficiently.
              </p>
              <button className="btn btn-primary btn-lg" type="button">
                Create New Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4">Your Research Projects</h2>

      {projects.length === 0 ? (
        <div className="alert alert-info">
          No projects found. Create your first project to get started!
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projects.map(project => (
            <div className="col" key={project.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{project.category}</h6>
                  <p className="card-text">{project.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge bg-${project.status === 'active' ? 'success' :
                                            project.status === 'completed' ? 'primary' :
                                            project.status === 'paused' ? 'warning' : 'danger'}`}>
                      {project.status}
                    </span>
                    <small className="text-muted">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleViewDetails(project.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="pt-3 mt-4 text-muted border-top">
        &copy; 2025 Research Dashboard
      </footer>
    </div>
  );
};

export default App;
