const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const server = express();

server.use(bodyParser.urlencoded({'extended': 'true'}));
server.use(bodyParser.json());

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use(cookieParser());

if(process.env.NODE_ENV !== 'production'){
    console.log(`Development Mode`);
} else {
    console.log(`Production Mode`);
}

const distPath = path.join(__dirname + "/../", 'dist');

server.use(express.static(distPath));

server.get('/', (req, res, next) => {
    res.sendFile('index.html',{root: distPath});
});

server.use(logger('dev'));

server.listen(8080);

console.log("App listening on port 8080");
