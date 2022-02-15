//Express
const express = require('express');
const router = express.Router();


router.get('/register', (req, res) => {
    if (req.cookies.token) {
        return res.redirect('/underconst');
    }
    return res.render('register.ejs');
});
router.get('/login', (req, res) => {
    console.log(req.cookies)
    if (req.cookies.token) {
        return res.redirect('/underconst');
    }
    return res.render('login.ejs');
});


router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard.ejs', {username : req.session.user.username});
    } else {
        res.redirect('/auth/login');
    }
});
module.exports = router;


