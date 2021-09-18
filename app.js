// Imports
//  generic
const config = require('./private/config.json');

const http = require('http');

//  express
const favicon = require('serve-favicon');

const express = require('express');
const app = express();

const routes = require('./lib/routes.js');

// Web Config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon('public/images/favicon.ico'));

app.use('/', routes);


// Web Listen
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});