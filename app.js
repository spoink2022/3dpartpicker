// Imports
//  generic
const config = require('./private/config.json');

const { getPart, integratePart } = require('./lib/get_part.js');

const http = require('http');

//  express
const express = require('express');
const app = express();

const routes = require('./lib/routes.js');

// Web Config
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/', routes);


// Web Listen
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});


// NEXT
/*async function test() {
    getPart(2, (part) => {
        console.log(part);
    });
}

test();
*/
