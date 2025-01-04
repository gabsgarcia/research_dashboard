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
