import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Extract the project ID from the URL
        const pathParts = window.location.pathname.split('/');
        const projectId = pathParts[pathParts.length - 1];

        if (!projectId) {
          setError('Project ID not found in URL');
          setLoading(false);
          return;
        }

        // Set up CSRF token
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
          axios.defaults.headers.common['X-CSRF-Token'] = token;
        }

        // Fetch project details
        const response = await axios.get(`/api/research_projects/${projectId}`);
        setProject(response.data);
      } catch (err) {
        console.error('Failed to load project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const handleBackClick = () => {
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
        <button className="btn btn-primary" onClick={handleBackClick}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Project Not Found</h4>
          <p>The requested project could not be found.</p>
        </div>
        <button className="btn btn-primary" onClick={handleBackClick}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button className="btn btn-outline-primary mb-4" onClick={handleBackClick}>
        &larr; Back to Dashboard
      </button>

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{project.title}</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h5 className="text-muted">{project.category}</h5>
            <div className="mt-2">
              <span className={`badge bg-${project.status === 'active' ? 'success' :
                                      project.status === 'completed' ? 'primary' :
                                      project.status === 'paused' ? 'warning' : 'danger'}`}>
                {project.status}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4>Description</h4>
            <p>{project.description}</p>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h4>Project Timeline</h4>
              <p>
                <strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}
              </p>
            </div>
            <div className="col-md-6">
              <h4>Additional Information</h4>
              <p>
                <strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Last Updated:</strong> {new Date(project.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
