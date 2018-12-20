const elasticsearch = require('elasticsearch');

const connectUrl = 'localhost:9200';

const client = new elasticsearch.Client({host: connectUrl,log: 'info'});

client.ping({requestTimeout: 1000}).then(() => {
    console.log(`Connected to Elasticsearch`);
}).catch((err) => {
    console.error(`ERROR: Error Connecting to Elasticsearch ${err}`);
});

module.exports = client;