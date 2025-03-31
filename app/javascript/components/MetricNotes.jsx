import React, { useState, useEffect } from 'react';
import { fetchNotes, createNote, deleteNote } from '../services/api';

const MetricNotes = ({ metricId }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setIsLoading(true);
        const notesData = await fetchNotes(metricId);
        setNotes(notesData);
      } catch (err) {
        setError('Failed to load notes. Please try again.');
        console.error('Notes loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (metricId) {
      loadNotes();
    }
  }, [metricId]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    try {
      const newNote = await createNote(metricId, { content: newNoteText });
      setNotes([...notes, newNote]);
      setNewNoteText('');
    } catch (err) {
      setError('Failed to add note. Please try again.');
      console.error('Add note error:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Delete note error:', err);
    }
  };

  if (isLoading) return <div className="loading-notes">Loading notes...</div>;

  return (
    <div className="metric-notes">
      <h3>Notes</h3>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddNote} className="add-note-form">
        <textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Add a note about this metric..."
          rows={3}
        />
        <button type="submit" disabled={!newNoteText.trim()}>
          Add Note
        </button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet. Add one above!</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-item">
              <p className="note-content">{note.content}</p>
              <div className="note-footer">
                <span className="note-date">
                  {new Date(note.created_at).toLocaleString()}
                </span>
                <button
                  className="delete-note"
                  onClick={() => handleDeleteNote(note.id)}
                  aria-label="Delete note"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MetricNotes;
