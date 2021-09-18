// Imports
//  generic
const config = require('./private/config.json');

const http = require('http');

//  express
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const routes = require('./lib/routes.js');

// Web Config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon('public/images/favicon.ico'));

app.use('/', routes);


// Web Listen
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});