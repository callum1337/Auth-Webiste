//Express
const express = require('express');
const router = express.Router();
const expressBrute = require('express-brute');

const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

router.get('/register', (req, res) => {
    //check if user is logged in
    if (req.cookies.token) {
        return res.redirect('/');
    }
    return res.render('register.ejs');
});
router.get('/login', (req, res) => {
    console.log(req.cookies)
    if (req.cookies.token) {
        //if token exists, redirect to home
        return res.redirect('/underconst');
    } else {
        //if token does not exist, render login page
    return res.render('login.ejs');
    }
});

module.exports = router;


