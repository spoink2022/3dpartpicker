const db = require('../db');
const { getPart, integratePart } = require("./getter/get_part");

let parts = [];

async function loadParts(qt) {
    for (let i=1; i<=qt; i++) {
        parts.push(await getPart(i));
    }
    //console.log(parts);
}

// integratePart(3, (part) => {
//     console.log(part);
// });

loadParts(3);

module.exports.getAllParts = async function() {
    return parts;
}