import React from "react";
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'active': return 'bg-success';
      case 'completed': return 'bg-primary';
      case 'paused': return 'bg-warning text-dark';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">{project.title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{project.description}</p>
        <div className="d-flex justify-content-between mt-3">
          <span className="badge bg-light text-dark">{project.category}</span>
          <span className={`badge ${getStatusBadgeClass(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>
      <div className="card-footer bg-white border-top-0">
        <Link to={`/projects/${project.id}`} className="btn btn-outline-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
app/javascript/components/ProjectCard.jsx
// import React from 'react';

// const ProjectCard = ({ project, isFavorite = false, onToggleFavorite = () => {} }) => {
//   // Handle null or undefined project
//   if (!project) {
//     console.error('ProjectCard received null or undefined project');
//     return null;
//   }

//   // Diagnostic logging
//   console.log('ProjectCard - Rendering project:', project);

//   // Safe access to project properties with defaults
//   const {
//     id = 'unknown',
//     title = 'Untitled Project',
//     description = 'No description provided',
//     created_at = new Date().toISOString(),
//     metrics_count = 0
//   } = project;

//   const handleFavoriteClick = (e) => {
//     e.preventDefault(); // Prevent navigating to project details
//     onToggleFavorite(id);
//   };

//   return (
//     <div className="project-card">
//       <div className="card-header">
//         <h3>{title}</h3>
//         <button
//           className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
//           onClick={handleFavoriteClick}
//           aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//         >
//           {isFavorite ? '★' : '☆'}
//         </button>
//       </div>

//       <p className="project-description">
//         {description && description.length > 100
//           ? `${description.substring(0, 100)}...`
//           : description}
//       </p>

//       <div className="project-meta">
//         <span className="created-date">
//           Created: {new Date(created_at).toLocaleDateString()}
//         </span>
//         {metrics_count > 0 && (
//           <span className="metrics-count">{metrics_count} metrics</span>
//         )}
//       </div>

//       <button className="view-details-button">
//         View Details
//       </button>
//     </div>
//   );
// };

// export default ProjectCard;
