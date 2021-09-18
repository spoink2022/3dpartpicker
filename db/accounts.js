const config = require('./config.js');

module.exports.getSeller = async function(id) {
    let query = 'SELECT * FROM sellers WHERE id=$1 LIMIT 1';
    let res = await config.pquery(query, [id]);
    return res[0];
}

module.exports.getAllSellers = async function() {
    let query = 'SELECT * FROM sellers ORDER BY id ASC';
    let res = await config.pquery(query, []);
    return res;
}

module.exports.getUser = async function(id) {
    let query = 'SELECT * FROM users WHERE id=$1 LIMIT 1';
    let res = await config.pquery(query, [id]);
    return res[0];
}

module.exports.getNearbySellers = async function(lat, lon, maxDistanceKm) {
    let maxDistanceDrg = maxDistanceKm/111;
    let query = 'SELECT * FROM sellers WHERE SQRT(POWER(lat-$1, 2) + POWER(lon-$2, 2)) < $3 ORDER BY (POWER(lat-$1, 2) + POWER(lon-$2, 2)) LIMIT 10';
    let res = await config.pquery(query, [lat, lon, maxDistanceDrg]);
    return res;
}