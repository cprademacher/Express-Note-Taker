// Pull in outside dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// Set the port for the server to listen/run on
const PORT = 3001;
// Save an instance of express to 'app'
const app = express();
// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(`${req.method} request received to get notes.`);

  console.info(`${req.method} request received to get notes.`);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request made to post a note.`);

  // add the actual posting of the note
});
