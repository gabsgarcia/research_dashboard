import React, { useState, useEffect } from 'react';

/**
 * MetricNotes component that displays and manages notes for a specific metric.
 *
 * @param {Object} props - Component props
 * @param {number} props.metricId - The ID of the metric to display notes for
 */
const MetricNotes = ({ metricId }) => {
  // State for storing notes data
  const [notes, setNotes] = useState([]);

  // State for tracking loading status
  const [loading, setLoading] = useState(true);

  // State for tracking error messages
  const [error, setError] = useState(null);

  // State for the new note text input
  const [newNoteText, setNewNoteText] = useState('');

  // Fetch notes when metricId changes
  useEffect(() => {
    // Skip API call if no metricId is provided
    if (!metricId) {
      setLoading(false);
      return;
    }

    // Get CSRF token for Rails authenticity
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    console.log(`Fetching notes for metric ID: ${metricId}`);

    // Fetch notes from the API
    fetch(`/api/metrics/${metricId}/notes`, {
      headers: {
        'X-CSRF-Token': csrfToken,
        'Accept': 'application/json'
      },
      credentials: 'same-origin' // Include cookies for authentication
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Notes loaded:', data);
      setNotes(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes. Please try again later.');
      setLoading(false);
    });
  }, [metricId]);

  /**
   * Handles the form submission to create a new note
   * @param {Event} e - The form submission event
   */
  const handleAddNote = (e) => {
    e.preventDefault();

    // Don't submit if there's no text
    if (!newNoteText.trim()) return;

    // Get CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // Create the new note
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        note: {
          metric_id: metricId,
          content: newNoteText
        }
      }),
      credentials: 'same-origin'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then(newNote => {
      // Add the new note to the list
      setNotes([...notes, newNote]);
      // Clear the input field
      setNewNoteText('');
    })
    .catch(error => {
      console.error('Error adding note:', error);
      setError('Failed to add note. Please try again.');
    });
  };

  /**
   * Handles deleting a note
   * @param {number} noteId - The ID of the note to delete
   */
  const handleDeleteNote = (noteId) => {
    // Get CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // Delete the note
    fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Remove the deleted note from the state
      setNotes(notes.filter(note => note.id !== noteId));
    })
    .catch(error => {
      console.error('Error deleting note:', error);
      setError('Failed to delete note. Please try again.');
    });
  };

  // Show loading state
  if (loading) {
    return <div className="text-center p-3">Loading notes...</div>;
  }

  // Show error message if something went wrong
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // No metric selected
  if (!metricId) {
    return <div className="text-center p-3 text-muted">Select a metric to view notes</div>;
  }

  return (
    <div className="metric-notes mt-4">
      <h3 className="mb-3">
        <i className="bi bi-journal-text me-2"></i>
        Notes
      </h3>

      {/* Note submission form */}
      <form onSubmit={handleAddNote} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Add a note about this metric..."
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!newNoteText.trim()}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Note
        </button>
      </form>

      {/* Notes list */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="text-center text-muted">No notes yet. Add one above!</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="card mb-3">
              <div className="card-body">
                <p className="card-text">{note.content}</p>
                <div className="d-flex justify-content-between align-items-center text-muted small">
                  <span>
                    {note.created_at && new Date(note.created_at).toLocaleString()}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteNote(note.id)}
                    aria-label="Delete note"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MetricNotes;
