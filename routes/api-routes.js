// var mongoose = require('mongoose');
var Headline = require('../models/Headline.js');
var Note = require('../models/Note.js');
var request = require('request');
var cheerio = require('cheerio');
var scrape = require('../scripts/scrape.js')


module.exports = function(app) {

  // scrape rt
  app.get('/scrape', function(req, res) {
    scrape()
    res.send("scrape complete")
  })

  // headlines rts
  app.get('/headlines', function(req, res) {
    Headline
      .find({saved: false})
      .sort({createdAt: -1})
      .then(headlines => res.json(headlines));
  })

  app.get('/headlines/:id', function(req, res) {
    Headline.findOne({ _id: req.params.id })
      .populate('note')
      .then(headlines => res.json(headlines));
  })

  app.put('/headlines/:id', function(req, res) {
    Headline.update({_id: req.params.id}, {$set: {saved: true}})
      .then(s => res.json(s))
  })

  app.post('/headlines/:id', function(req, res){
    Note.create(req.body)
      .then(function(dbNote){
        return Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
      })
      .then(function(dbHeadline){
        res.json(dbHeadline);
      })
      .catch(function(err){
        res.json(err);
      })
  })

  // saved headline rt
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

  // delete note rt
  app.post('/note/:id', function(req, res) {
    Note.deleteOne({ _id: req.params.id })
      .then(deleted => res.json(deleted))
  })

}

