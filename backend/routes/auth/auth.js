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
    console.log(req.session)
    res.send(req.session)
});
module.exports = router;


