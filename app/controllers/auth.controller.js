const db = require('../configs/config.connexion');

const Admin = {
    getAdminByName: (id_personnel, callback) => {
        db.on.query(`SELECT * FROM personnel where id_personnel=?`,[id_personnel], (err, result, fields) => {
            if (err) { callback(err, null); return; }
            callback(null, result);
        });
    }
};



module.exports = {
    Admin,
};