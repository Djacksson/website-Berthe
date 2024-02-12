const db = require('../configs/config.connexion');

const Admin = {
    getAdminByName: (email, callback) => {
        db.on.query(`SELECT * FROM user where email=?`,[email], (err, result, fields) => {
            if (err) { callback(err, null); return; }
            callback(null, result);
        });
    }
};



module.exports = {
    Admin,
};