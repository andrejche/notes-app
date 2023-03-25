import React, { useState, useEffect } from "react";
import "./App.css";

function NotesApp() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // load the saved notes (if there are any)
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    // add the new note to the list of notes
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    // save the list of notes to local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
    // clear the input field
    setNewNote("");
  };

  const handleNoteDelete = (index) => {
    // remove the note at the specified index
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    // save the updated list of notes to local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  return (
    <div className="NotesApp">
      <h1 className="NotesApp-title">Notes App</h1>
      <form onSubmit={handleNoteSubmit}>
        <label className="NotesApp-label" htmlFor="note">
          Enter your note:
        </label>
        <br />
        <textarea
          className="NotesApp-textarea"
          id="note"
          value={newNote}
          onChange={handleNoteChange}
        ></textarea>
        <br />
        <button className="NotesApp-button" type="submit">
          Save Note
        </button>
      </form>
      <br />
      <h2 className="NotesApp-subtitle">Saved Notes</h2>
      {notes.length === 0 ? (
        <p className="NotesApp-empty">No notes saved.</p>
      ) : (
        <ul className="NotesApp-list">
          {notes.map((note, index) => (
            <li className="NotesApp-item" key={index}>
              {note}
              <button
                className="NotesApp-delete"
                onClick={() => handleNoteDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesApp;
