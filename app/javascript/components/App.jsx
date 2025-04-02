// // app/javascript/components/App.jsx
// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// const App = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Set up CSRF token for axios
//     const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
//     if (token) {
//       axios.defaults.headers.common['X-CSRF-Token'] = token;
//     }

//     // Simple function to fetch projects
//     const fetchProjects = async () => {
//       try {
//         console.log('Fetching research projects...');
//         const response = await axios.get('/api/research_projects');
//         console.log('Projects data:', response.data);
//         setProjects(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching projects:', err);
//         setError('Failed to load projects. Check the console for details.');
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Function to handle navigation to project details
//   const handleViewDetails = (projectId) => {
//     window.location.href = `/projects/${projectId}`;
//   };

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="mt-3">Loading projects...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           <h4 className="alert-heading">Error</h4>
//           <p>{error}</p>
//           <hr />
//           <p className="mb-0">Please try refreshing the page or contact support.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       <header className="pb-3 mb-4 border-bottom">
//         <h1 className="display-5 fw-bold">Research Dashboard</h1>
//       </header>

//       <div className="row">
//         <div className="col-12 mb-4">
//           <div className="p-5 mb-4 bg-body-tertiary rounded-3">
//             <div className="container-fluid py-5">
//               <h1 className="display-5 fw-bold">Welcome to Research Dashboard</h1>
//               <p className="col-md-8 fs-4">
//                 Track and manage your research projects efficiently.
//               </p>
//               <button className="btn btn-primary btn-lg" type="button">
//                 Create New Project
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <h2 className="mb-4">Your Research Projects</h2>

//       {projects.length === 0 ? (
//         <div className="alert alert-info">
//           No projects found. Create your first project to get started!
//         </div>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//           {projects.map(project => (
//             <div className="col" key={project.id}>
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">{project.title}</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">{project.category}</h6>
//                   <p className="card-text">{project.description}</p>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className={`badge bg-${project.status === 'active' ? 'success' :
//                                             project.status === 'completed' ? 'primary' :
//                                             project.status === 'paused' ? 'warning' : 'danger'}`}>
//                       {project.status}
//                     </span>
//                     <small className="text-muted">
//                       Created: {new Date(project.created_at).toLocaleDateString()}
//                     </small>
//                   </div>
//                 </div>
//                 <div className="card-footer">
//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     onClick={() => handleViewDetails(project.id)}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <footer className="pt-3 mt-4 text-muted border-top">
//         &copy; 2025 Research Dashboard
//       </footer>
//     </div>
//   );
// };

// // export default App;
// // app/javascript/components/App.jsx
// import React, { useState, useEffect } from "react";
// import NavBar from "./NavBar";
// import Dashboard from "./Dashboard";

// const App = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log('App - Fetching projects...');
//     fetch('/api/research_projects')
//       .then(response => {
//         if (!response.ok) throw new Error('Network response was not ok');
//         return response.json();
//       })
//       .then(data => {
//         // Diagnostic logging
//         console.log('App - API Response data:', data);
//         console.log('App - Data type:', typeof data);
//         console.log('App - Is Array:', Array.isArray(data));

//         // Ensure we have an array to work with
//         let safeProjects = [];

//         // Convert to array if needed
//         if (Array.isArray(data)) {
//           safeProjects = data;
//         } else if (data && typeof data === 'object') {
//           // Check if it's an object that should be treated as an array
//           if (Object.keys(data).some(key => !isNaN(parseInt(key)))) {
//             safeProjects = Object.values(data);
//           } else if (data.projects) {
//             safeProjects = data.projects;
//           } else {
//             // Last resort - try to see if it has array-like properties
//             console.log('App - Trying to extract projects from data object');
//             // If we can't determine the structure, at least ensure we have an array
//             safeProjects = [];
//           }
//         }

//         console.log('App - Processed projects:', safeProjects);
//         console.log('App - Is processed array?', Array.isArray(safeProjects));

//         setProjects(safeProjects);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('App - Error fetching projects:', error);
//         setError('Failed to load projects. Please check the console for details.');
//         setLoading(false);
//       });
//   }, []);

//   // Diagnostic render
//   console.log('App - Rendering with projects:', projects);
//   console.log('App - Is rendering array?', Array.isArray(projects));

//   if (loading) return <div className="loading">Loading projects...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="app-container">
//       <NavBar />
//       <main className="main-content">
//         <Dashboard projects={projects} />
//       </main>
//     </div>
//   );
// };

// export default App;
// app/javascript/components/App.jsx
import React from 'react';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div className="container mt-4">
      <h1>Research Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default App;
