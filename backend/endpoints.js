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
    const email = req.body.email;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Internal Error')
        }
        if (results.length === 0) {
            return res.status(404).send('User Not Found')
        }
        if (!checkPassword(password, results[0].password)) {
            return res.status(401).send('Password Is Wrong')
        }
        res.status(200).send('Login Successful')
    })
});



//POST OBJECTS
router.post('/users/add', function(req, res) {
    const user = req.body.user
    const password = req.body.password
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long')
    }
    if (user.length < 3) {
        return res.status(400).send('Username must be at least 3 characters long')
    }
    const password_hashed = hashPassword(password)
    const email = req.body.email
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [user, email], function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).send('Internal Error')
        } else{
            if (result.length > 0) {
                res.status(409).send('User already exists')
            } else {
                connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user, password_hashed, email], function(err, result) {
                    if (err) {
                        console.log(err)
                        return res.status(500).send('Internal Error')
                    } else {
                        res.status(201).send('User created')
                    }
                })
            }
        }
    })
});


module.exports = router;


