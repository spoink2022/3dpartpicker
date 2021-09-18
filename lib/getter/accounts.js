const db = require('../../db');

async function getUser(id) {
    let user = await db.accounts.getUser(id);
    return user;
}

async function getSeller(id) {
    let seller = await db.accounts.getSeller(id);
    return seller;
}

module.exports = {
    getUser: getUser,
    getSeller: getSeller
}