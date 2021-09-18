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
    let sellers = await db.accounts.getNearbySellers(lat, lon, 10);
    for (let i=0; i<sellers.length; i++) {
        let transactions = await db.transactions.getSellerTransactions(sellers[i].id);
        let transactionQt = transactions.length;
        let rating = transactions.map(obj => obj.rating).reduce((a, b) => a + b, 0) / transactionQt;
        rating = Math.round(rating * 10) / 10;
        sellers[i].transactions = transactionQt;
        sellers[i].rating = rating;
    }
    return sellers;
}

module.exports = {
    getUser: getUser,
    getSeller: getSeller,
    getNearbySellers: getNearbySellers
}