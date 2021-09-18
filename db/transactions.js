const config = require('./config.js');

module.exports.addTransaction = async function(customer, seller, rating, product) {
    let query = 'INSERT INTO transactions (customer, seller, rating, product) VALUES ($1, $2, $3, $4)';
    await config.pquery(query, [customer, seller, rating, product]);
    return;
}

module.exports.getSellerTransactions = async function(seller) {
    let query = 'SELECT * FROM transactions WHERE seller=$1';
    let res = await config.pquery(query, [seller]);
    return res;
}

module.exports.getProductTransactions = async function(product) {
    let query = 'SELECT * FROM transactions WHERE product=$1';
    let res = await config.pquery(query, [product]);
    return res;
}