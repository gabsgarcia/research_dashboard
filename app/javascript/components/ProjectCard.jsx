import React from 'react';

/**
 * ProjectCard component that displays a single research project in a card format.
 *
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object containing title, description, etc.
 */
const ProjectCard = ({ project }) => {
  // Handle case where project is undefined or null
  if (!project) {
    console.error('ProjectCard received null or undefined project');
    return null;
  }

  /**
   * Returns the appropriate Bootstrap color class for the status badge
   * based on the project's status
   */
  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'bg-success';
      case 'completed': return 'bg-primary';
      case 'paused': return 'bg-warning text-dark';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  /**
   * Navigate to project details page
   */
  const handleViewDetails = () => {
    window.location.href = `/projects/${project.id}`;
  };

  /**
   * Format date as a readable string, with fallback for invalid dates
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

  return (
    <div className="card h-100 shadow-sm">
      {/* Card header with project title */}
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">{project.title || 'Untitled Project'}</h5>
      </div>

      {/* Card body with project details */}
      <div className="card-body">
        {/* Project description with fallback */}
        <p className="card-text">
          {project.description || 'No description provided'}
        </p>

        {/* Project metadata */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="badge bg-light text-dark">
            {project.category || 'Uncategorized'}
          </span>
          <span className={`badge ${getStatusBadgeClass(project.status)}`}>
            {project.status || 'Unknown'}
          </span>
        </div>

        {/* Project dates */}
        <div className="small text-muted mt-3">
          <div>Start: {formatDate(project.start_date)}</div>
          <div>End: {formatDate(project.end_date)}</div>
        </div>
      </div>

      {/* Card footer with action buttons */}
      <div className="card-footer bg-white">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleViewDetails}
          >
            <i className="bi bi-eye me-1"></i> View Details
          </button>

          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-star me-1"></i> Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
