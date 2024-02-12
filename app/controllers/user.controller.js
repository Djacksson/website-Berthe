const db = require('../configs/config.connexion');

const User = {
    getAllUser: (callback) => {
        db.on.query('SELECT * FROM personnel', (err, result, fields) => {
            if (err) { callback(err, null); return; }
            callback(null, result);
        });
    }
};



module.exports = {
    User,
};