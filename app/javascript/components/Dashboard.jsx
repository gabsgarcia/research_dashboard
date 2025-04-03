// In Dashboard.jsx, add favorite functionality
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set up CSRF token for axios
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
          axios.defaults.headers.common['X-CSRF-Token'] = token;
        }

        // Fetch projects and favorites in parallel
        const [projectsResponse, favoritesResponse] = await Promise.all([
          axios.get('/api/research_projects'),
          axios.get('/api/favorites')
        ]);

        setProjects(projectsResponse.data);

        // Create a set of favorited project IDs for easy checking
        const favoriteProjectIds = new Set(
          favoritesResponse.data.map(fav => fav.research_project_id)
        );
        setFavorites(favoriteProjectIds);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please check the console for details.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle navigation to project details
  const handleViewDetails = (projectId) => {
    window.location.href = `/projects/${projectId}`;
  };

  // Function to toggle favorite status
  const toggleFavorite = async (projectId) => {
    try {
      if (favorites.has(projectId)) {
        // Remove from favorites
        await axios.delete(`/api/research_projects/${projectId}/favorite`);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.delete(projectId);
          return newFavorites;
        });
      } else {
        // Add to favorites
        await axios.post(`/api/research_projects/${projectId}/favorite`);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.add(projectId);
          return newFavorites;
        });
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Failed to update favorites. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Filter for favorite projects
  const favoriteProjects = projects.filter(project => favorites.has(project.id));

  return (
    <div className="dashboard-container">
      {/* Favorites Section */}
      {favoriteProjects.length > 0 && (
        <div className="mb-5">
          <h2>Favorite Projects</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {favoriteProjects.map(project => (
              <div className="col" key={`fav-${project.id}`}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{project.title}</h5>
                      <button
                        className="btn btn-sm btn-link text-warning"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.id);
                        }}
                      >
                        <i className="bi bi-star-fill"></i>
                      </button>
                    </div>
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
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleViewDetails(project.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <h2>All Research Projects</h2>

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
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{project.title}</h5>
                    <button
                      className="btn btn-sm btn-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(project.id);
                      }}
                    >
                      <i className={`bi ${favorites.has(project.id) ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
                    </button>
                  </div>
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
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleViewDetails(project.id)}
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
