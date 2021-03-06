// Imports
//  generic
const config = require('./private/config.json');

const fs = require('fs');
const http = require('http');
const https = require('https');

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

if (config.SSL) {
    app.use(function(req, res, next) {
        if(!req.secure) {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        next();
    });
}

app.use('/', routes);


// Web Listen
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

if (config.SSL) {
    var privateKey  = fs.readFileSync('/etc/letsencrypt/live/3dpartpicker.com/privkey.pem', 'utf8');
    var certificate = fs.readFileSync('/etc/letsencrypt/live/3dpartpicker.com/cert.pem', 'utf8');
    var credentials = {key: privateKey, cert: certificate};

    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443);
    console.log(`Listening: https on port 443`);
}