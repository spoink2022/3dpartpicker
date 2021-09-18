const config = require('./config.js');

module.exports.getPart = async function(id) {
    let query = 'SELECT * FROM parts WHERE id=$1 LIMIT 1';
    let res = await config.pquery(query, [id]);
    return res[0];
}

module.exports.updateSpecs = async function(id, s) {
    let query = 'UPDATE parts SET x=$1, y=$2, z=$3, weight=$4, price_20=$5, price_50=$6 WHERE id=$7 RETURNING *';
    let res = await config.pquery(query, [s.x, s.y, s.z, s.weight, s.price_20, s.price_50, id]);
    return res[0];
}