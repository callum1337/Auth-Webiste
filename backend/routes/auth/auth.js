//Express
const express = require('express');
const router = express.Router();


router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/underconst');
    }
    return res.render('register.ejs',{loggedin: false});
});
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('dashboard');
    } else {
        return res.render('login.ejs',{loggedin: false});
    }
});


router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard.ejs', {userobj : req.session.user, loggedin: true});
    } else {
        res.redirect('/auth/login');
    }
});
module.exports = router;


