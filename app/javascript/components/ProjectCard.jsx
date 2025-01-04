import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigating to project details
    onToggleFavorite(project.id);
  };

  return (
    <div className="project-card">
      <div className="card-header">
        <h3>{project.title}</h3>
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <p className="project-description">
        {(project.description && project.description.length > 100)
          ? `${project.description.substring(0, 100)}...`
          : project.description}
      </p>

      <div className="project-meta">
        <span className="created-date">Created: {new Date(project.created_at).toLocaleDateString()}</span>
        {project.metrics_count && (
          <span className="metrics-count">{project.metrics_count} metrics</span>
        )}
      </div>

      <Link to={`/projects/${project.id}`} className="view-details-button">
        View Details
      </Link>
    </div>
  );
};

export default ProjectCard;
