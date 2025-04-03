import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching research projects...');
        const response = await axios.get('/api/research_projects');
        console.log('Projects data:', response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please check the console for details.');
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
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Your Research Projects</h2>

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
                    <span className={`badge bg-${
                      project.status === 'active' ? 'success' :
                      project.status === 'completed' ? 'primary' :
                      project.status === 'paused' ? 'warning' : 'danger'
                    }`}>
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
    </div>
  );
};

export default Dashboard;
