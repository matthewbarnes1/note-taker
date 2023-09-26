const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const note = require('express').Router();
const { v4: uuidv4 } = require('uuid');

note.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
note.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});