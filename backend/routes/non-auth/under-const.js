//Express
const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/underconst', (req, res, next) => {
    if (req.session.user) {
        res.render('underconst.ejs', {loggedin: true, userobj: req.session.user});
    } else {
        res.render('underconst.ejs', {loggedin: false});
    }
});

module.exports = router;


