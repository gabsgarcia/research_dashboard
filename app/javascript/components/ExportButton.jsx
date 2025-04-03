import React, { useState } from 'react';

// /**
//  * ExportButton component provides a button to export project metrics as CSV.
//  *
//  * This component:
//  * - Shows a button to trigger the export
//  * - Handles the API call to the export endpoint
//  * - Shows loading state during export
//  * - Provides error handling
//  *
//  * @param {Object} props - Component props
//  * @param {number} props.projectId - The ID of the project to export
//  */
const ExportButton = ({ projectId }) => {
  // State to track loading status
  const [isExporting, setIsExporting] = useState(false);
  // State to track any errors
  const [error, setError] = useState(null);

  // Get CSRF token for Rails authenticity
  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  };

  // Handle the export action
  const handleExport = () => {
    // Don't proceed if already exporting or missing projectId
    if (isExporting || !projectId) return;

    setIsExporting(true);
    setError(null);

    // Temporarily show loading state, as the request will trigger a file download
    setTimeout(() => {
      setIsExporting(false);
    }, 3000);

    // Make the request to export endpoint
    // Note: We use window.location for direct download instead of axios
    window.location.href = `/api/research_projects/${projectId}/export.csv`;
  };

  return (
    <>
      <button
        className="btn btn-success"
        onClick={handleExport}
        disabled={isExporting || !projectId}
      >
        {isExporting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Exporting...
          </>
        ) : (
          <>
            <i className="bi bi-file-earmark-arrow-down me-2"></i>
            Export Metrics as CSV
          </>
        )}
      </button>

      {/* Display any errors */}
      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}
    </>
  );
};

export default ExportButton;
