const cheerio = require('cheerio');
const request = require('request');
var Headline = require(`../models/Headline.js`);


//Function to scrape from the website medium
const scrape = function() {
  // scrape data from news.ycombinator
  request("https://news.ycombinator.com/", function (error, response, html) {
  
    var $ = cheerio.load(html);

    // alll the news starts here:
    $("tr.athing").each(function (i, element) {

      // scrape last td for title and link
      var td = $(element).children('td').last()

      var title = $(td).children('a').text();
      var link = $(td).children('a').attr('href')

      // scrape span for news source
      var span = $(td).children('span')
      var a = $(span).children('a')
      var source = $(a).children('span').text()

      // write articles to mongodb
      // with upsert to avoid dups
      if (title && link) {
        Headline.create({
          title: title,
          link: link,
          source: source
        },
        {
          upsert: true
        },

        // there appear to be extraneous tds on this page 
        // that are not legit titles for articles
        (err, inserted) => { /* err ? console.log(err) : console.log(inserted) */ });
      };
    });
  
  });

}

module.exports = scrape;
