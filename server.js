const express =require("express");// importing express 
const path = require("path");// importing path to work with directories and file paths
const db = require ("./db/db.json");// importing db.json file where the user input will be stored.

const app = express();// express is turned into app const for easier calls
const PORT = process.env.port || 3001;// the port which can be used to check if the backend is working on insomia

