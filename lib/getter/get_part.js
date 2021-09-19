const NodeStl = require('node-stl');
const request = require('request');

const config = require('../../private/config.json');
const db = require('../../db');

async function parseSTL(id, cb) {
    const settings = {
        method: 'GET',
        url: `${config.fileHosting}/${id}/part.stl`,
        encoding: null,
    };
    
    request(settings, (err, res, body) => {
        var stl = new NodeStl(body);
        cb(stl);
    });
}

async function calculatePartSpecs(part, cb) {
    parseSTL(part.id, async (stl) => {
        let specs = {
            x: Math.round(stl.boundingBox[0]),
            y: Math.round(stl.boundingBox[1]),
            z: Math.round(stl.boundingBox[2]),
            weight: Math.round(stl.weight),
            price_20: Math.round(stl.weight * 0.6 * 1.2 * 5 + stl.area/200 + 400), //mass (time), border
            price_50: Math.round(stl.weight * 1 * 1.2 * 5 + stl.area/200 + 400)
        };
        cb(specs);
    });
}

async function getPart(id) {
    let part = await db.parts.getPart(id);
    if (!part) { return false; }

    let imageURLs = Array.from(Array(part.img_qt).keys()).map(num => `${config.fileHosting}/${id}/${num}.png`);
    part.images = imageURLs;

    part.purchases = (await db.transactions.getProductTransactions(id)).length;
    return part;
}

async function integratePart(id, cb) {
    let part = await db.parts.getPart(id);
    if (!part) { return false; }

    let imageURLs = Array.from(Array(part.img_qt).keys()).map(num => `${config.fileHosting}/${id}/${num}.png`);

    calculatePartSpecs(part, async (specs) => {
        part = await db.parts.updateSpecs(id, specs);
        part.images = imageURLs;
        cb(part);
    });
}

module.exports.getPart = getPart;
module.exports.integratePart = integratePart;