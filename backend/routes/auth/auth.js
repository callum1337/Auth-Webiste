//Express
const express = require('express');
const router = express.Router();
const expressBrute = require('express-brute');






router.get('/register', (req, res) => {
	return res.render('register.ejs');
});
router.get('/login', (req, res) => {
    return res.render('login.ejs');
});

module.exports = router;


