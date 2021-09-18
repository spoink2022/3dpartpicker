const { getPart } = require("./get_part");

let parts = [];

async function loadParts(qt) {
    for (let i=1; i<=qt; i++) {
        parts.push(await getPart(i));
    }
}

loadParts(2);

module.exports.getAllParts = async function() {
    return parts;
}