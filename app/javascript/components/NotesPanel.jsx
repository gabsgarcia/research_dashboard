import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 
//  NotesPanel component that displays and manages notes for a metric.
//
//  This component allows users to:
//  - View existing notes for a metric
//  - Add new notes
//  - Delete notes they've created
//
//  @param {Object} props - Component props
//  @param {number} props.metricId - The ID of the metric to display notes for
//  @param {boolean} props.refreshTrigger - A value that changes to trigger a refresh
//  @param {function} props.onRefreshNeeded - Callback to trigger parent component refresh

const NotesPanel = ({ metricId, refreshTrigger, onRefreshNeeded }) => {
  // State for notes data
  const [notes, setNotes] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for the new note content
  const [newNote, setNewNote] = useState('');
  // State to track if a note is being submitted
  const [submitting, setSubmitting] = useState(false);

  // Get CSRF token for Rails authenticity
  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  };

  // Fetch notes when metricId or refreshTrigger changes
  useEffect(() => {
    if (!metricId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch notes for this metric
    axios.get(`/api/metrics/${metricId}/notes`, {
      headers: {
        'X-CSRF-Token': getCsrfToken(),
        'Accept': 'application/json'
      }
    })
    .then(response => {
      console.log('Notes loaded:', response.data);
      setNotes(response.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching notes:', err);
      setError('Failed to load notes. Please try again later.');
      setLoading(false);
    });
  }, [metricId, refreshTrigger]);

  // Handle new note submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Don't submit if the note is empty or we're already submitting
    if (!newNote.trim() || submitting) return;

    setSubmitting(true);

    // Create a new note
    axios.post('/api/notes', {
      note: {
        metric_id: metricId,
        content: newNote
      }
    }, {
      headers: {
        'X-CSRF-Token': getCsrfToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Note created:', response.data);
      // Add the new note to the list
      setNotes([...notes, response.data]);
      // Clear the input field
      setNewNote('');
      // Notify parent that data has changed
      if (onRefreshNeeded) onRefreshNeeded();
    })
    .catch(err => {
      console.error('Error creating note:', err);
      setError('Failed to create note. Please try again.');
    })
    .finally(() => {
      setSubmitting(false);
    });
  };

  // Handle note deletion
  const handleDelete = (noteId) => {
    // Delete the note
    axios.delete(`/api/notes/${noteId}`, {
      headers: {
        'X-CSRF-Token': getCsrfToken()
      }
    })
    .then(() => {
      // Remove the deleted note from the state
      setNotes(notes.filter(note => note.id !== noteId));
      // Notify parent that data has changed
      if (onRefreshNeeded) onRefreshNeeded();
    })
    .catch(err => {
      console.error('Error deleting note:', err);
      setError('Failed to delete note. Please try again.');
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // If no metric is selected
  if (!metricId) {
    return (
      <div className="card mt-3">
        <div className="card-body text-center text-muted">
          <i className="bi bi-sticky-fill fs-1"></i>
          <p>Select a metric to view and add notes</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="card mt-3">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading notes...</span>
          </div>
          <p className="mt-2">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mt-3">
      <div className="card-header bg-light">
        <h5 className="mb-0">
          <i className="bi bi-journal-text me-2"></i>
          Notes for This Metric
        </h5>
      </div>
      <div className="card-body">
        {/* Error message if there is one */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Form to add a new note */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="noteContent" className="form-label">Add a new note:</label>
            <textarea
              id="noteContent"
              className="form-control"
              rows="3"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your observations or comments about this metric..."
              disabled={submitting}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!newNote.trim() || submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Adding...
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                Add Note
              </>
            )}
          </button>
        </form>

        {/* List of existing notes */}
        <h6>{notes.length} {notes.length === 1 ? 'Note' : 'Notes'}</h6>

        {notes.length === 0 ? (
          <div className="text-center text-muted my-4">
            <i className="bi bi-journal fs-1"></i>
            <p className="mt-2">No notes yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="notes-list">
            {notes.map(note => (
              <div key={note.id} className="card mb-3 border-light">
                <div className="card-body">
                  <p className="card-text">{note.content}</p>
                  <div className="d-flex justify-content-between align-items-center text-muted small">
                    <span>
                      <i className="bi bi-calendar-event me-1"></i>
                      {formatDate(note.created_at)}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(note.id)}
                      aria-label="Delete note"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPanel;
