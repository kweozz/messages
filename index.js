const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Voor het parseren van JSON

let messages = []; // Fakedatabase: een array voor berichten

// GET /api/v1/messages - Alle berichten teruggeven
app.get('/api/v1/messages', (req, res) => {
  res.json({
    status: "success",
    message: "Messages fetched successfully",
    data: { messages }
  });
});

// GET /api/v1/messages/:id - Een specifiek bericht ophalen
app.get('/api/v1/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find(msg => msg.id === id);

  if (message) {
    res.json({
      status: "success",
      message: "Message fetched successfully",
      data: { message }
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Message not found"
    });
  }
});

// POST /api/v1/messages - Een nieuw bericht toevoegen
app.post('/api/v1/messages', (req, res) => {
  const { user, text } = req.body.message;
  const newMessage = {
    id: messages.length + 1, // Auto-increment id
    user,
    text
  };
  messages.push(newMessage);

  res.json({
    status: "success",
    message: "Message added successfully",
    data: { message: newMessage }
  });
});

// PUT /api/v1/messages/:id - Een specifiek bericht updaten
app.put('/api/v1/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body.message;
  const message = messages.find(msg => msg.id === id);

  if (message) {
    message.text = text; // Update de tekst
    res.json({
      status: "success",
      message: "Message updated successfully",
      data: { message }
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Message not found"
    });
  }
});

// DELETE /api/v1/messages/:id - Een specifiek bericht verwijderen
app.delete('/api/v1/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = messages.findIndex(msg => msg.id === id);

  if (index !== -1) {
    messages.splice(index, 1); // Verwijder het bericht
    res.json({
      status: "success",
      message: "Message deleted successfully"
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Message not found"
    });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Server draait op poort 3000
});
