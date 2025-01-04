import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProject, fetchMetrics, exportProjectCSV } from '../services/api';
import MetricChart from './MetricChart';
import MetricNotes from './MetricNotes';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [uniqueMetricNames, setUniqueMetricNames] = useState([]);
  const [selectedMetricName, setSelectedMetricName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setIsLoading(true);
        // Fetch project details
        const projectData = await fetchProject(id);
        setProject(projectData);

        // Fetch project metrics
        const metricsData = await fetchMetrics(id);
        setMetrics(metricsData);

        // Extract unique metric names
        const metricNames = [...new Set(metricsData.map(metric => metric.name))];
        setUniqueMetricNames(metricNames);

        // Set first metric name as selected by default if available
        if (metricNames.length > 0) {
          setSelectedMetricName(metricNames[0]);
        }
      } catch (err) {
        setError('Failed to load project details. Please try again later.');
        console.error('Project details loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [id]);

  const handleMetricSelect = (metricName) => {
    setSelectedMetricName(metricName);
  };

  const handleExportCSV = async () => {
    try {
      setExportLoading(true);
      await exportProjectCSV(id);
      setExportLoading(false);
    } catch (err) {
      setError('Failed to export data. Please try again.');
      console.error('CSV export error:', err);
      setExportLoading(false);
    }
  };

  if (isLoading) return <div className="loading">Loading project details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!project) return <div className="not-found">Project not found</div>;

  // Find a sample metric with the selected name to display its notes
  const sampleMetric = metrics.find(metric => metric.name === selectedMetricName);

  return (
    <div className="project-details-container">
      <div className="header-section">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <h1>{project.title}</h1>
        <button
          className="export-button"
          onClick={handleExportCSV}
          disabled={exportLoading}
        >
          {exportLoading ? 'Exporting...' : 'Export to CSV'}
        </button>
      </div>

      <div className="project-info">
        <p className="description">{project.description}</p>
        <div className="metadata">
          <span>Category: {project.category}</span>
          <span>Status: {project.status}</span>
          <span>Timeline: {new Date(project.start_date).toLocaleDateString()} to {new Date(project.end_date).toLocaleDateString()}</span>
        </div>
      </div>

      {metrics.length === 0 ? (
        <div className="no-metrics">
          <p>No metrics available for this project yet.</p>
        </div>
      ) : (
        <div className="metrics-section">
          <div className="metrics-sidebar">
            <h2>Metrics</h2>
            <ul>
              {uniqueMetricNames.map(metricName => (
                <li
                  key={metricName}
                  className={selectedMetricName === metricName ? 'selected' : ''}
                  onClick={() => handleMetricSelect(metricName)}
                >
                  {metricName}
                </li>
              ))}
            </ul>
          </div>

          <div className="metric-content">
            {selectedMetricName ? (
              <>
                <div className="metric-header">
                  <h2>{selectedMetricName}</h2>
                  {sampleMetric && (
                    <p>{sampleMetric.notes}</p>
                  )}
                </div>

                <div className="chart-container">
                  <MetricChart metricName={selectedMetricName} metrics={metrics} />
                </div>

                {sampleMetric && (
                  <div className="notes-container">
                    <MetricNotes metricId={sampleMetric.id} />
                  </div>
                )}
              </>
            ) : (
              <p>Select a metric to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
