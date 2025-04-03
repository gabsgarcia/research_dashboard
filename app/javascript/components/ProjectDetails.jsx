// app/javascript/components/ProjectDetails.jsx
import React, { useState, useEffect } from 'react';
import MetricChart from './MetricChart';
import MetricNotes from './MetricNotes';

/**
 * ProjectDetails component that displays detailed information about a specific project.
 * Includes project metadata, metrics, and allows adding/viewing notes.
 */
const ProjectDetails = () => {
  // State for project data
  const [project, setProject] = useState(null);

  // State for metrics data
  const [metrics, setMetrics] = useState([]);

  // State for the currently selected metric
  const [selectedMetric, setSelectedMetric] = useState(null);

  // State for tracking loading status
  const [loading, setLoading] = useState(true);

  // State for tracking error messages
  const [error, setError] = useState(null);

  /**
   * Extract the project ID from the URL
   * @returns {string|null} The project ID or null if not found
   */
  const getProjectIdFromUrl = () => {
    // Split the URL path
    const pathParts = window.location.pathname.split('/');
    // The last part should be the project ID
    const projectId = pathParts[pathParts.length - 1];

    // Make sure it's a number
    return !isNaN(projectId) ? projectId : null;
  };

  // Load project data when the component mounts
  useEffect(() => {
    // Get the project ID from the URL
    const projectId = getProjectIdFromUrl();

    // If no project ID is found, set an error
    if (!projectId) {
      setError('Project ID not found in URL');
      setLoading(false);
      return;
    }

    // Get CSRF token for Rails authenticity
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    console.log(`Loading details for project ID: ${projectId}`);

    // Fetch project data
    fetch(`/api/research_projects/${projectId}`, {
      headers: {
        'X-CSRF-Token': csrfToken,
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then(projectData => {
      console.log('Project data loaded:', projectData);
      setProject(projectData);

      // Once we have the project, fetch its metrics
      return fetch(`/api/research_projects/${projectId}/metrics`, {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': 'application/json'
        },
        credentials: 'same-origin'
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error fetching metrics: ${response.status}`);
      }
      return response.json();
    })
    .then(metricsData => {
      console.log('Metrics data loaded:', metricsData);
      setMetrics(metricsData);

      // If metrics exist, select the first one by default
      if (metricsData.length > 0) {
        setSelectedMetric(metricsData[0]);
      }

      setLoading(false);
    })
    .catch(error => {
      console.error('Error loading project details:', error);
      setError('Failed to load project details. Please try again later.');
      setLoading(false);
    });
  }, []); // Empty dependency array means this effect runs once when component mounts

  /**
   * Handle clicking on a metric in the sidebar
   * @param {Object} metric - The metric object that was clicked
   */
  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  /**
   * Format a date string in a readable format
   * @param {string} dateString - The ISO date string
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  /**
   * Navigate back to the dashboard
   */
  const handleBackClick = () => {
    window.location.href = '/dashboard';
  };

  // Show loading indicator
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading project details...</p>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
        <button className="btn btn-primary" onClick={handleBackClick}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Show not found message if project doesn't exist
  if (!project) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Project Not Found</h4>
          <p>The requested project could not be found.</p>
        </div>
        <button className="btn btn-primary" onClick={handleBackClick}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Back button */}
      <button className="btn btn-outline-primary mb-4" onClick={handleBackClick}>
        <i className="bi bi-arrow-left me-2"></i>
        Back to Dashboard
      </button>

      {/* Project header */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{project.title}</h2>
        </div>
        <div className="card-body">
          {/* Project metadata */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h4>Project Details</h4>
              <p><strong>Category:</strong> {project.category}</p>
              <p>
                <strong>Status:</strong>
                <span className={`badge ${
                  project.status === 'active' ? 'bg-success' :
                  project.status === 'completed' ? 'bg-primary' :
                  project.status === 'paused' ? 'bg-warning text-dark' : 'bg-danger'
                } ms-2`}>
                  {project.status}
                </span>
              </p>
              <p><strong>Description:</strong><br/>{project.description}</p>
            </div>
            <div className="col-md-6">
              <h4>Timeline</h4>
              <p><strong>Start Date:</strong> {formatDate(project.start_date)}</p>
              <p><strong>End Date:</strong> {formatDate(project.end_date)}</p>
              <p><strong>Created:</strong> {formatDate(project.created_at)}</p>
              <p><strong>Last Updated:</strong> {formatDate(project.updated_at)}</p>
            </div>
          </div>

          {/* Export button */}
          <a
            href={`/api/research_projects/${project.id}/export.csv`}
            className="btn btn-outline-success mb-3"
          >
            <i className="bi bi-file-earmark-excel me-2"></i>
            Export to CSV
          </a>
        </div>
      </div>

      {/* Metrics section */}
      <h3 className="mb-3">Project Metrics</h3>

      {metrics.length === 0 ? (
        <div className="alert alert-info">
          <p>No metrics have been added to this project yet.</p>
          <button className="btn btn-primary mt-2">
            <i className="bi bi-plus-circle me-2"></i>
            Add Metric
          </button>
        </div>
      ) : (
        <div className="row">
          {/* Metrics sidebar */}
          <div className="col-md-3">
            <div className="list-group">
              {metrics.map(metric => (
                <button
                  key={metric.id}
                  className={`list-group-item list-group-item-action ${
                    selectedMetric && selectedMetric.id === metric.id ? 'active' : ''
                  }`}
                  onClick={() => handleMetricClick(metric)}
                >
                  {metric.name}
                  <span className="float-end badge bg-primary rounded-pill">
                    {metric.value}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Metric details */}
          <div className="col-md-9">
            {selectedMetric ? (
              <div className="card">
                <div className="card-header">
                  <h4>{selectedMetric.name}</h4>
                </div>
                <div className="card-body">
                  <p><strong>Current Value:</strong> {selectedMetric.value}</p>
                  <p><strong>Date:</strong> {formatDate(selectedMetric.date)}</p>
                  <p><strong>Description:</strong> {selectedMetric.description}</p>

                  {/* Metric chart */}
                  <div className="mt-4">
                    <MetricChart
                      metricName={selectedMetric.name}
                      metrics={metrics.filter(m => m.name === selectedMetric.name)}
                    />
                  </div>

                  {/* Metric notes */}
                  <MetricNotes metricId={selectedMetric.id} />
                </div>
              </div>
            ) : (
              <div className="alert alert-info">
                <p>Select a metric from the sidebar to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
