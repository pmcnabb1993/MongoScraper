// Dependencies
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const request = require("request");
const logger = require('morgan');
const app = express();

// Our scraping tools
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

// If deployed, use the database. Otherwise use the local database.
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {})

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "news";
var collections = ["article"];

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
// Set up a static folder (public) for our web app
app.use(express.static('public'));

// Handlebars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Require api and html routes
require("./routes/view-routes.js")(app);
require("./routes/api-routes.js")(app);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
    console.log("Database Error:", error);
  });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the app to listen on port 3000
app.listen(PORT, number => console.log(`App running on port ${PORT}!`));
  