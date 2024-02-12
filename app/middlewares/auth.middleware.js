require('dotenv').config()
const jwt = require('jsonwebtoken');


// Middleware pour l'authentification
function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ').slice(-1)[0];

    if (!token) { return res.status(401).json({ message: 'Unauthorized: Token missing' }); }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) { return res.status(401).json({ message: 'Unauthorized: Invalid token' }) }
        req.admin = decoded;
        next();
    });
}


module.exports = {
    verifyToken,
}