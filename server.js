// Dependencies
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

// Our scraping tools
const cheerio = require("cheerio");

// Require all models
const models = require("./models");

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "news";
var collections = ["article"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
    console.log("Database Error:", error);
  });

  //Routes
  app.get("/", function(req, res){
      res.send("Hello World");
  });

  app.get("/all", function(req, res){
      db.animals.find({}, function(error, docs){
          if (error) {
              console.log(error);
          }
          else {
              res.json(docs);
          }
      });
  });

// Set the app to listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  