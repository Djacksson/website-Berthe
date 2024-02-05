require('dotenv').config()
const express = require('express');
const { User } = require('../controllers/user.controller');
const router = express.Router();


router.get('/getAllUser', async (req, res) => {
    User.getAllUser((err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'User successfully found !', user: data })
    })
});


module.exports = router;