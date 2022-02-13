const express = require('express');
const router = express.Router();
const connection = require('./connect_sql.js');
//import the 2 functions from hash.js
const hash = require('./utils/hash.js');
const hashPassword = hash.hashPassword;
const checkPassword = hash.checkPassword;





router.get('/register', (req, res, next) => {
	return res.render('register.ejs');
});
router.get('/login', (req, res, next) => {
    return res.render('login.ejs');
});



//GET OBJECTS\
//Login Get Method
router.post('/users/login', (req, res, next) => {
    console.log(req.body)
    res.send('test')
});



//POST OBJECTS
router.post('/users/add', function(req, res) {
        const user = req.body.user
        const password = req.body.password
        const password_hashed = hashPassword(password)
        const email = req.body.email
        connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [user, email], function(err, result) {
            if (err) res.status(500);
            if (result.length > 0) {
                res.status(409).send('User already exists')
            } else {
                connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user, password_hashed, email], function(err, result) {
                    if (err) res.status(500);
                    res.status(201).send('User created')
                })
            }
        })
})



module.exports = router;


