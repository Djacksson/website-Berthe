require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { Admin } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Route de connexion
router.post('/login', async (req, res) => {
    const { id_personnel, password } = req.body;

    Admin.getAdminByName(id_personnel, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            const hashedEnteredPassword = crypto.createHash('md5').update(password).digest('hex');
            const password_db = data[0].pass;

            console.log("Input",hashedEnteredPassword);
            console.log("Out",password_db);
            
            if (hashedEnteredPassword === password_db) {
                // Les mots de passe correspondent
                const token = jwt.sign({ userId: data[0].N, id_personnel: data[0].id_personnel }, process.env.SECRET_KEY);
                res.status(200).json({ message: 'Login successful', access_token: token });
            } else {
                // Les mots de passe ne correspondent pas
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            // const checkPassword = await bcrypt.compareSync(password, data[0].pass);

            // if (!checkPassword) {
            //     return res.status(401).json({ message: 'Invalid credentials' });
            // }
        }
    })
});


router.get('/protected', verifyToken, async (req, res) => {
    Admin.getAdminByName(req.admin.id_personnel, async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Login successful', admin: data[0] });
    })
})


module.exports = router;
