const express =require("express");// importing express 
const db = require ("./db/db.json");// importing db.json file where the user input will be stored.

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

// Routes

//HTML

//API

