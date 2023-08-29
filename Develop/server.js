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
  // log that a post request was made
  console.info(`${req.method} request made to post a note.`);

  //   destructuring assignment for the items in req.body
  const { title, text } = req.body;

  //   Make sure all properties are present
  if (title && text) {
    const newNote = {
      title,
      text,
    };

    // convert the data into a string so we can save it
    fs.readFile("./db/db.json", "utf-8", (error, data) => {
      const currentNotes = (data && JSON.parse(data)) || [];
      currentNotes.push(newNote);

      // write the string to a file
      fs.writeFile("./db/db.json", JSON.stringify(currentNotes), (err) => {
        err
          ? console.error(err)
          : console.log(
              `Review for ${newReview.product} has been written to JSON file`
            );
      });

      const response = {
        status: "success",
        body: newNote,
      };

      console.log(response);
      res.status(201).json(response);
    });
  } else {
    res.status(500).json("Error in posting note.");
  }
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${port}`);
});
