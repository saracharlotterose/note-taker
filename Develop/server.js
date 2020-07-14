const express = require("express");
const path = require("path");
const fs = require("fs")
const data =require("./db/db.json")
var uniqid = require('uniqid');
 
; 
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });



app.get("/api/notes", (req, res) => {
  return res.json(data);
});


app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;
newNote.id = uniqid()


  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  

  console.log(newNote);
  //add a new id
  
  data.push(newNote);

  fs.writeFileSync("db/db.json", JSON.stringify(data))
  res.json(data)
});
    
  app.delete("/api/notes/:id", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    
    const id = req.params.id//this is undefined, figure out how to not make this undefined
const noteIndex = data.findIndex(note => note.id === id)
    if(noteIndex === -1){
      res.sendStatus(404)
      
    }else{
      data.splice(noteIndex, 1);
      res.send("note deleted")
    }
  }); 
  
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});