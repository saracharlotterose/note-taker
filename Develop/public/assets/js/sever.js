const express = require("express");
const path = require("path");
const fs = require("fs")
// Sets up the Express App
// =============================================================
const app = express();
const PORT = 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  app.get("/api/notes", (req, res) => {
      res.readFile( "db.json", "utf8", function converting(){
    return res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    characters.push(newNote);
  
    res.json(newNote);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
})