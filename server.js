const express =require("express");// importing express 
const db = require ("./db/db.json");// importing db.json file where the user input will be stored.
const uniqId = require('uniqueid');// allows for unique ids to be created 
// dependencies
const path = require("path");// importing path to work with directories and file paths
const fs = require("fs"); // importing file system module


// envriorment variable port
const PORT = process.env.port || 3001;

// express is turned into app const for easier calls
const app = express();
// middleware for parsing JSON and urlcoded form data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// express creates a path for all the files in the public folder.
app.use (express.static("public"));

// Routes //

//Routes for the public folder files

// GET route for the homepage
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

// GET route for notes page
app.get("/notes",(req, res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})


//API

// GET API route to read the db.json file to return all the saved as a JSON
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})

app.post("/api/notes", (req, res) => {
   
    //creates a new user note body
    const userNote = req.body;
    // gives each new notes an id
    userNote.id = uniqId;
    // adds the new note object created by user when saved
    db.push(userNote);
    //updates the json file with the new usernote object
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    //the response will be the note object
    res.JSON(db);

})
