require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Admin } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    Admin.getAdminByName(email, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            const checkPassword = await bcrypt.compareSync(password, data[0].password);

            if (!checkPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: data[0].id, email: data[0].email }, process.env.SECRET_KEY);
            res.status(200).json({ message: 'Login successful', access_token: token });
        }
    })
});


router.get('/protected', verifyToken, async (req, res) => {
    Admin.getAdminByName(req.admin.email, async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Login successful', admin: data[0] });
    })
})


module.exports = router;
