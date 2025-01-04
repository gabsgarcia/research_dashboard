import axios from 'axios';

// Configure Axios
const configureAxios = () => {
  // Get CSRF token from meta tag
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  // Set default headers
  if (token) {
    axios.defaults.headers.common['X-CSRF-Token'] = token;
  }

  // Set content type
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // Handle unauthorized responses
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        window.location = '/users/sign_in';
      }
      return Promise.reject(error);
    }
  );
};

// Call the configuration function
configureAxios();

// Base API URL
const API_URL = '/api';

// Error handler
const handleError = (error) => {
  console.error('API Error:', error.response || error);
  throw error;
};

// Projects API
export const fetchProjects = async () => {
  try {
    console.log('Fetching projects...');
    const response = await axios.get(`${API_URL}/research_projects`);
    console.log('Projects response:', response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchProject = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/research_projects/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Metrics API
export const fetchMetrics = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/research_projects/${projectId}/metrics`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Favorites API
export const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/favorites`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const toggleFavorite = async (projectId) => {
  try {
    // Check if the project is already favorited
    const favorites = await fetchFavorites();
    const isFavorited = favorites.some(fav => fav.research_project_id === parseInt(projectId));

    if (isFavorited) {
      // If already favorited, unfavorite it
      await axios.delete(`${API_URL}/research_projects/${projectId}/favorite`);
      return { success: true, message: "Project removed from favorites" };
    } else {
      // If not favorited, favorite it
      const response = await axios.post(`${API_URL}/research_projects/${projectId}/favorite`);
      return response.data;
    }
  } catch (error) {
    return handleError(error);
  }
};

// Notes API
export const fetchNotes = async (metricId) => {
  try {
    const response = await axios.get(`${API_URL}/metrics/${metricId}/notes`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createNote = async (metricId, noteData) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, {
      note: {
        metric_id: metricId,
        content: noteData.content
      }
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteNote = async (noteId) => {
  try {
    await axios.delete(`${API_URL}/notes/${noteId}`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};

// For CSV export
export const exportProjectCSV = async (projectId) => {
  try {
    window.location.href = `${API_URL}/research_projects/${projectId}/export.csv`;
    return true;
  } catch (error) {
    return handleError(error);
  }
};
