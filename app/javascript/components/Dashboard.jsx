import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchProjects, fetchFavorites, toggleFavorite } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Fetch projects and favorites in parallel
        const [projectsData, favoritesData] = await Promise.all([
          fetchProjects(),
          fetchFavorites()
        ]);

        setProjects(projectsData);
        setFavorites(favoritesData);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Check if a project is in favorites
  const isFavorite = (projectId) => {
    return favorites.some(fav => fav.research_project_id === projectId);
  };

  // Handle toggling a project as favorite/unfavorite
  const handleToggleFavorite = async (projectId) => {
    try {
      const updatedFavorite = await toggleFavorite(projectId);

      if (isFavorite(projectId)) {
        // Remove from favorites if it was favorited
        setFavorites(favorites.filter(fav => fav.research_project_id !== projectId));
      } else {
        // Add to favorites
        setFavorites([...favorites, updatedFavorite]);
      }
    } catch (err) {
      setError('Failed to update favorite. Please try again.');
      console.error('Favorite toggle error:', err);
    }
  };

  if (isLoading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Research Projects Dashboard</h1>

      {favorites.length > 0 && (
        <div className="favorites-section">
          <h2>Favorite Projects</h2>
          <div className="project-grid">
            {projects
              .filter(project => isFavorite(project.id))
              .map(project => (
                <ProjectCard
                  key={`fav-${project.id}`}
                  project={project}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
          </div>
        </div>
      )}

      <div className="all-projects-section">
        <h2>All Projects</h2>
        {projects.length === 0 ? (
          <p>No research projects found. Create your first project to get started!</p>
        ) : (
          <div className="project-grid">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isFavorite={isFavorite(project.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
