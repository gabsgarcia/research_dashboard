import React from "react";
import ProjectCard from "./ProjectCard";

const Dashboard = ({ projects }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Your Research Projects</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center p-5 bg-light rounded border">
          <h3 className="mb-3">No projects found</h3>
          <p className="text-muted mb-4">Create a new project to get started</p>
          <button className="btn btn-primary">Create Project</button>
        </div>
      ) : (
        <div className="row g-4">
          {projects.map(project => (
            <div className="col-md-6 col-lg-4" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
