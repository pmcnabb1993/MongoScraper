// var mongoose = require('mongoose');
var Headline = require('../models/Headline.js');
var Comment = require('../models/comment.js');
var request = require('request');
var cheerio = require('cheerio');
var scrape = require('../scripts/scrape.js') 


module.exports = function(app) {

  // Scrape function
  app.get('/scrape', function(req, res) {
    scrape()
    res.send("Scrape is completed")
  })

  // Scrape Headlines
  app.get('/headlines', function(req, res) {
    Headline
      .find({saved: false})
      .sort({createdAt: -1})
      .then(headlines => res.json(headlines));
  })

  app.get('/headlines/:id', function(req, res) {
    Headline.findOne({ _id: req.params.id })
      .populate('comment')
      .then(headlines => res.json(headlines));
  })

  app.put('/headlines/:id', function(req, res) {
    Headline.update({_id: req.params.id}, {$set: {saved: true}})
      .then(s => res.json(s))
  })

  app.post('/headlines/:id', function(req, res){
    Comment.create(req.body)
      .then(function(dbComment){
        return Headline.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true })
      })
      .then(function(dbHeadline){
        res.json(dbHeadline);
      })
      .catch(function(err){
        res.json(err);
      })
  })

  // Save articles
  app.get('/saved', function(req, res) {
    Headline
      .find({saved: true})
      .sort({createdAt: -1})
      .then(headlines => res.json(headlines));
  })

  app.put('/saved/:id', function(req, res) {
    Headline.update({_id: req.params.id}, {$set: {saved: false}})
      .then(s => res.json(s))
  })

  // Delete Comments
  app.post('/comment/:id', function(req, res) {
    Comment.deleteOne({ _id: req.params.id })
      .then(deleted => res.json(deleted))
  })

}