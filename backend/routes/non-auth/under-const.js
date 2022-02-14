//Express
const express = require('express');
const router = express.Router();


router.get('/underconst', (req, res, next) => {
    return res.render('underconst.ejs');
});

module.exports = router;


