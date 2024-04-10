const express = require("express");// importing express 
const db = require("./db/db.json");// importing db.json file where the user input will be stored.
const uniqId = require('uniqid');// allows for unique ids to be created 
// dependencies
const path = require("path");// importing path to work with directories and file paths
const fs = require("fs"); // importing file system module


// envriorment variable port
const PORT = process.env.port || 3001;

// express is turned into app const for easier calls
const app = express();
// middleware for parsing JSON and urlcoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// express creates a path for all the files in the public folder.
app.use(express.static("public"));

// Routes //

//Routes for the public folder files

// GET route for the homepage
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

// GET route for notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})


//API

// GET API route to read the db.json file to return all the saved notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})
//POST API route to create a new note
app.post("/api/notes", (req, res) => {

    //creates a new user note body and gives each new notes an id
    const userNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqId()
    };

    // adds the new note object created by user when saved
    db.push(userNote);
    //updates the json file with the new usernote object
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    //the response will be the note object
    res.json(db);

});


// express deletes notes when button is clicked on the public side and note is deleted form the JSON file
app.delete("/api/notes/:id", (req, res) => {

    // using the id to delete the note that user wants to delete
    const noteDelete = db.filter(item => item.id !== req.params.id);

    // update the json files so that it does not have the note the was delelted
    fs.writeFileSync("./db/db.json", JSON.stringify(noteDelete));
    // the reposnse will note have the deleted note
    res.json(noteDelete);
});
// express listens in the 3001 port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
