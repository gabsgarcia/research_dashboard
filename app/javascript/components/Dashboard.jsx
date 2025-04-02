// import React from "react";
// import ProjectCard from "./ProjectCard";

// const Dashboard = ({ projects }) => {
//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Your Research Projects</h1>
//         <button className="btn btn-primary">
//           <i className="bi bi-plus-circle me-2"></i>
//           New Project
//         </button>
//       </div>

//       {projects.length === 0 ? (
//         <div className="text-center p-5 bg-light rounded border">
//           <h3 className="mb-3">No projects found</h3>
//           <p className="text-muted mb-4">Create a new project to get started</p>
//           <button className="btn btn-primary">Create Project</button>
//         </div>
//       ) : (
//         <div className="row g-4">
//           {projects.map(project => (
//             <div className="col-md-6 col-lg-4" key={project.id}>
//               <ProjectCard project={project} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
// app/javascript/components/Dashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import ProjectCard from './ProjectCard';

// // const Dashboard = ({ projects = [] }) => {
// //   // Always ensure projects is an array with a default value
// //   const safeProjects = Array.isArray(projects) ? projects : [];

// //   // Diagnostic logging
// //   console.log('Dashboard - Received projects:', projects);
// //   console.log('Dashboard - Safe projects array:', safeProjects);

// //   return (
// //     <div className="dashboard-container">
// //       <h1>Research Projects Dashboard</h1>

// //       <div className="all-projects-section">
// //         <h2>All Projects</h2>
// //         {safeProjects.length === 0 ? (
// //           <p>No research projects found. Create your first project to get started!</p>
// //         ) : (
// //           <div className="project-grid">
// //             {safeProjects.map(project => (
// //               <ProjectCard
// //                 key={project.id || Math.random().toString()}
// //                 project={project}
// //                 isFavorite={false}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

import React, { useState, useEffect } from 'react';

// The Dashboard component shows a list of research projects
const Dashboard = () => {
  // State to store the projects data
  // useState initializes the state with an empty array
  const [projects, setProjects] = useState([]);

  // State to track if data is still loading
  const [loading, setLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState(null);

  // useEffect runs after the component renders
  // The empty array [] as second argument means this only runs once when the component mounts
  useEffect(() => {
    console.log('Dashboard component mounted - fetching projects');

    // Fetch projects from your Rails API
    fetch('/api/research_projects')
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Log the received data for debugging
        console.log('Projects received:', data);

        // Update the projects state with the received data
        setProjects(data);

        // Set loading to false since we have the data now
        setLoading(false);
      })
      .catch(error => {
        // Log any errors
        console.error('Error fetching projects:', error);

        // Update the error state
        setError('Failed to load projects. Please try again later.');

        // Set loading to false even if there's an error
        setLoading(false);
      });
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="alert alert-info">Loading projects...</div>;
  }

  // Show an error message if something went wrong
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Make sure projects is an array (defensive programming)
  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="dashboard-container">
      <h2>Your Research Projects</h2>

      {/* Conditional rendering: show a message if there are no projects */}
      {safeProjects.length === 0 ? (
        <div className="alert alert-info">
          No projects found. Create your first project to get started!
        </div>
      ) : (
        // If there are projects, map through them and display each one
        <div className="row">
          {safeProjects.map(project => (
            // Always use a unique key for list items in React
            <div className="col-md-4 mb-4" key={project.id || `project-${Math.random()}`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <p>
                    <strong>Category:</strong> {project.category}
                  </p>
                  <p>
                    <strong>Status:</strong> {project.status}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => window.location.href = `/projects/${project.id}`}
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
