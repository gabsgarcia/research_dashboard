import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetricName, setSelectedMetricName] = useState(null);

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

        console.log(`Fetching project data for ID: ${projectId}`);

        // Fetch project details
        const projectResponse = await axios.get(`/api/research_projects/${projectId}`);
        console.log('Project data:', projectResponse.data);
        setProject(projectResponse.data);

        try {
          // Fetch metrics for this project in a separate try-catch
          console.log(`Fetching metrics for project ID: ${projectId}`);
          const metricsResponse = await axios.get(`/api/research_projects/${projectId}/metrics`);
          console.log('Metrics data:', metricsResponse.data);
          const metricsData = metricsResponse.data || [];
          setMetrics(metricsData);

          // Set the first metric name as selected by default if metrics exist
          if (metricsData.length > 0) {
            // Get unique metric names
            const uniqueMetricNames = [...new Set(metricsData.map(metric => metric.name))];
            setSelectedMetricName(uniqueMetricNames[0]);
          }
        } catch (metricsError) {
          console.error('Failed to load metrics:', metricsError);
          // Don't fail the whole component if metrics fail
          setMetrics([]);
        }
      } catch (err) {
        console.error('Failed to load project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  // Get unique metric names for the selector
  const uniqueMetricNames = [...new Set(metrics.map(metric => metric.name))];

  // Filter metrics by selected name and sort by date
  const getChartData = () => {
    if (!selectedMetricName) return [];

    return metrics
      .filter(metric => metric.name === selectedMetricName)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(metric => ({
        date: new Date(metric.date).toLocaleDateString(),
        value: metric.value,
      }));
  };

  const handleBackClick = () => {
    window.location.href = '/';
  };

  // Group metrics by name
  const metricsByName = {};
  metrics.forEach(metric => {
    if (!metricsByName[metric.name]) {
      metricsByName[metric.name] = [];
    }
    metricsByName[metric.name].push(metric);
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading project details...</p>
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

  const chartData = getChartData();

  return (
    <div className="container py-4">
      <button className="btn btn-outline-primary mb-4" onClick={handleBackClick}>
        &larr; Back to Dashboard
      </button>

      <div className="card mb-4">
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

      {/* Metrics Chart Section */}
      {metrics.length > 0 && (
        <div className="card mb-4">
          <div className="card-header bg-info text-white">
            <h3 className="mb-0">Metrics Visualization</h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="metricSelector" className="form-label">Select Metric:</label>
              <select
                id="metricSelector"
                className="form-select"
                value={selectedMetricName || ''}
                onChange={(e) => setSelectedMetricName(e.target.value)}
              >
                {uniqueMetricNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            {chartData.length > 0 ? (
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name={selectedMetricName}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="alert alert-info">
                No data available for {selectedMetricName}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metrics Table Section */}
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Project Metrics Data</h3>
        </div>
        <div className="card-body">
          {metrics.length === 0 ? (
            <div className="alert alert-info">No metrics available for this project.</div>
          ) : (
            <div>
              {Object.entries(metricsByName).map(([name, metricsForName]) => (
                <div key={name} className="mb-4">
                  <h4 className="border-bottom pb-2">{name}</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Value</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metricsForName.sort((a, b) => new Date(b.date) - new Date(a.date)).map(metric => (
                          <tr key={metric.id}>
                            <td>{new Date(metric.date).toLocaleDateString()}</td>
                            <td>{metric.value}</td>
                            <td>{metric.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
