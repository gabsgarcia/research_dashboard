/**
 * API service module that provides functions for making API requests.
 * This centralizes API-related logic and makes it reusable across components.
 */

/**
 * Gets the CSRF token from the page meta tags
 * @returns {string|null} The CSRF token or null if not found
 */
const getCsrfToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

/**
 * Default request headers including CSRF token and JSON content type
 * @returns {Object} Headers object
 */
const getDefaultHeaders = () => {
  return {
    'X-CSRF-Token': getCsrfToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
};

/**
 * Helper function to handle API errors
 * @param {Response} response - The fetch API response
 * @returns {Promise} A promise that resolves to the JSON data or rejects with an error
 */
const handleResponse = async (response) => {
  // First check if the response is OK (status 200-299)
  if (!response.ok) {
    // Try to get error details from the response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || `API error: ${response.status}`;
    } catch (e) {
      errorMessage = `API error: ${response.status}`;
    }

    throw new Error(errorMessage);
  }

  // For successful requests, return the JSON data
  return response.json();
};

// API functions for Research Projects
const projectsApi = {
  /**
   * Get all projects
   * @returns {Promise} Promise resolving to array of projects
   */
  getAll: () => {
    return fetch('/api/research_projects', {
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Get a specific project by ID
   * @param {number} id - Project ID
   * @returns {Promise} Promise resolving to project data
   */
  getById: (id) => {
    return fetch(`/api/research_projects/${id}`, {
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Create a new project
   * @param {Object} projectData - Project data
   * @returns {Promise} Promise resolving to created project
   */
  create: (projectData) => {
    return fetch('/api/research_projects', {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({ research_project: projectData }),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Update an existing project
   * @param {number} id - Project ID
   * @param {Object} projectData - Updated project data
   * @returns {Promise} Promise resolving to updated project
   */
  update: (id, projectData) => {
    return fetch(`/api/research_projects/${id}`, {
      method: 'PUT',
      headers: getDefaultHeaders(),
      body: JSON.stringify({ research_project: projectData }),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Delete a project
   * @param {number} id - Project ID
   * @returns {Promise} Promise resolving to success message
   */
  delete: (id) => {
    return fetch(`/api/research_projects/${id}`, {
      method: 'DELETE',
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Get metrics for a project
   * @param {number} projectId - Project ID
   * @returns {Promise} Promise resolving to array of metrics
   */
  getMetrics: (projectId) => {
    return fetch(`/api/research_projects/${projectId}/metrics`, {
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  }
};

// API functions for Metrics
const metricsApi = {
  /**
   * Get a specific metric by ID
   * @param {number} id - Metric ID
   * @returns {Promise} Promise resolving to metric data
   */
  getById: (id) => {
    return fetch(`/api/metrics/${id}`, {
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Create a new metric
   * @param {number} projectId - Project ID
   * @param {Object} metricData - Metric data
   * @returns {Promise} Promise resolving to created metric
   */
  create: (projectId, metricData) => {
    return fetch(`/api/research_projects/${projectId}/metrics`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({ metric: metricData }),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Get notes for a metric
   * @param {number} metricId - Metric ID
   * @returns {Promise} Promise resolving to array of notes
   */
  getNotes: (metricId) => {
    return fetch(`/api/metrics/${metricId}/notes`, {
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  }
};

// API functions for Notes
const notesApi = {
  /**
   * Create a new note
   * @param {number} metricId - Metric ID
   * @param {string} content - Note content
   * @returns {Promise} Promise resolving to created note
   */
  create: (metricId, content) => {
    return fetch('/api/notes', {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({
        note: {
          metric_id: metricId,
          content: content
        }
      }),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  },

  /**
   * Delete a note
   * @param {number} noteId - Note ID
   * @returns {Promise} Promise resolving to success message
   */
  delete: (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(handleResponse);
  }
};

// API functions for authentication
const authApi = {
  /**
   * Check if user is logged in
   * @returns {Promise} Promise resolving to authentication status
   */
  checkLoggedIn: () => {
    return fetch('/users/check_logged_in', {
      headers: getDefaultHeaders(),
      credentials: 'same-origin'
    })
    .then(response => {
      return {
        loggedIn: response.ok,
        status: response.status
      };
    });
  }
};

// Export all API functions
export {
  projectsApi,
  metricsApi,
  notesApi,
  authApi
};
