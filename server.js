// Dependencies
var express = require("express");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

// Our scraping tools
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

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
  