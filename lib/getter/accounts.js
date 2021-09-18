const db = require('../../db');

async function getUser(id) {
    let user = await db.accounts.getUser(id);
    return user;
}

async function getSeller(id) {
    let seller = await db.accounts.getSeller(id);
    return seller;
}

async function getNearbySellers(lat, lon, maxDistanceKm) {
    let sellers = await db.accounts.getNearbySellers(user.lat, user.lon, 10);
    return sellers;
}

module.exports = {
    getUser: getUser,
    getSeller: getSeller,
    getNearbySellers: getNearbySellers
}