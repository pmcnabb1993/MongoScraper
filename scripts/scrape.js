const cheerio = require('cheerio');
const axios = require('axios');

const MEDIUM_URL = 'https://medium.com/topic/technology';

const scrapeMedium = function() {
  return axios.get(MEDIUM_URL).then(html => {
    const $ = cheerio.load(html);
  });
};

module.exports = {
  scrapeMedium: scrapeMedium,
};