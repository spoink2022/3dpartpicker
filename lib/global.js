const db = require('../db');
const { getPart, integratePart } = require("./getter/get_part");

let parts = [];

async function loadParts(qt) {
    for (let i=1; i<=qt; i++) {
        parts.push(await getPart(i));
    }
    //let nearby = await db.accounts.getNearbySellers(43.49004, -79.68649, 2);
    //console.log(nearby);
}


loadParts(3);

module.exports.getAllParts = async function() {
    return parts;
}

// SANDBOX
//integratePart(4, (part) => {
//     console.log(part);
//});

for (let i=0; i<10; i++) {
    let customer = 1;
    let seller = 0 * (Math.floor(Math.random() * 3) + 1);
    let rating = Math.floor(Math.random() * 2) + 1;
    let product = Math.floor(Math.random() * 0) + 1;
    //db.transactions.addTransaction(customer, seller, rating, product);
}