const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');  // For generating unique IDs

const router = express.Router();

// Path to the database
const dbPath = './db/db.json';

// Helper function to load notes
const loadNotes = () => {
    try {
        const notes = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(notes);
    } catch (err) {
        console.error("Error reading the database:", err);
        return [];
    }
};

// Helper function to save notes
const saveNotes = (notes) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(notes, null, 4));
    } catch (err) {
        console.error("Error writing to the database:", err);
    }
};

// GET Route to retrieve all notes
router.get('/notes', (req, res) => {
    const notes = loadNotes();
    res.json(notes);
});

// POST Route to add a new note
router.post('/notes', (req, res) => {
    const notes = loadNotes();

    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    notes.push(newNote);
    saveNotes(notes);

    res.json(newNote);
});

// DELETE Route to delete a note by its ID
router.delete('/notes/:id', (req, res) => {
    const notes = loadNotes();
    const newNotesList = notes.filter(note => note.id !== req.params.id);

    if (newNotesList.length !== notes.length) {
        saveNotes(newNotesList);
        res.json({ message: 'Note deleted successfully' });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

module.exports = router;
