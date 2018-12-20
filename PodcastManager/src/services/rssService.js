const _  = require('lodash');
const RssParser  = require('rss-parser');

let rssParser = new RssParser();

const query = async (url, username, password) => {
    let feed = await rssParser.parseURL(url);

    console.log(`Feed: ${JSON.stringify(feed, null, 2)}`);

    return feed;
};

module.exports = {
    query
};