const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const DB_PATH = path.join(__dirname, '../db/db.json');

const getNotes = () => {
    const notes = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(notes);
};

const saveNotes = (notes) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(notes, null, 2));
};

router.get('/api/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    const notes = getNotes();
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
});

router.delete('/api/notes/:id', (req, res) => {
    const notes = getNotes();
    const filteredNotes = notes.filter(note => note.id !== req.params.id);
    saveNotes(filteredNotes);
    res.json({ msg: 'Note deleted' });
});

module.exports = router;
