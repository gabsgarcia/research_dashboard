// import React, { useState, useEffect } from 'react';
// import ProjectCard from './ProjectCard';

// /**
//  * Dashboard component that displays a list of research projects.
//  * Fetches project data from the API and renders it in a grid layout.
//  */
// const Dashboard = () => {
//   // State for storing projects data
//   const [projects, setProjects] = useState([]);

//   // State for tracking loading status
//   const [loading, setLoading] = useState(true);

//   // State for storing any error messages
//   const [error, setError] = useState(null);

//   // Fetch projects when the component mounts
//   useEffect(() => {
//     // Get CSRF token for Rails authenticity
//     const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

//     console.log('Dashboard: Fetching projects...');

//     // Make API request to get projects
//     fetch('/api/research_projects', {
//       headers: {
//         'X-CSRF-Token': csrfToken,
//         'Accept': 'application/json'
//       },
//       credentials: 'same-origin' // Include cookies for authentication
//     })
//     .then(response => {
//       // Check if response is OK
//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Log data for debugging
//       console.log('Projects loaded:', data);

//       // Update state with project data
//       setProjects(data);
//       setLoading(false);
//     })
//     .catch(error => {
//       console.error('Error fetching projects:', error);
//       setError('Failed to load projects. Please try again later.');
//       setLoading(false);
//     });
//   }, []); // Empty dependency array means this effect runs once when component mounts

//   // Show loading indicator while data is being fetched
//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="mt-3">Loading your projects...</p>
//       </div>
//     );
//   }

//   // Show error message if something went wrong
//   if (error) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         <h4 className="alert-heading">Error</h4>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   // Make sure projects is an array (defensive programming)
//   const safeProjects = Array.isArray(projects) ? projects : [];

//   return (
//     <div className="dashboard-container">
//       {/* Dashboard header with action buttons */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Your Research Projects</h1>
//         <a href="/research_projects/new" className="btn btn-primary">
//           <i className="bi bi-plus-circle me-2"></i>
//           New Project
//         </a>
//       </div>

//       {/* Show message if no projects */}
//       {safeProjects.length === 0 ? (
//         <div className="alert alert-info">
//           <h4>No projects found</h4>
//           <p>You don't have any research projects yet. Click the "New Project" button to get started.</p>
//         </div>
//       ) : (
//         // Project grid - responsive layout with 3 columns on large screens
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//           {safeProjects.map(project => (
//             <div className="col" key={project.id || `project-${Math.random()}`}>
//               {/* Use the ProjectCard component to display each project */}
//               <ProjectCard project={project} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching research projects...');
        const response = await axios.get('/api/research_projects');
        console.log('Projects data:', response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please check the console for details.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Your Research Projects</h2>

      {projects.length === 0 ? (
        <div className="alert alert-info">
          No projects found. Create your first project to get started!
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projects.map(project => (
            <div className="col" key={project.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{project.category}</h6>
                  <p className="card-text">{project.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge bg-${
                      project.status === 'active' ? 'success' :
                      project.status === 'completed' ? 'primary' :
                      project.status === 'paused' ? 'warning' : 'danger'
                    }`}>
                      {project.status}
                    </span>
                    <small className="text-muted">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="card-footer">
                  <a
                    href={`/projects/${project.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    View Details
                  </a>
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
