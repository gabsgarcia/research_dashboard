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
// app/javascript/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard Component</h2>
      <p>Dashboard loaded successfully!</p>
    </div>
  );
};

export default Dashboard;
