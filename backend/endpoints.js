//Express
const express = require('express');
const router = express.Router();
const connection = require('./utils/connect_sql.js');

//Hashing
const hash = require('./utils/hashing.js');
const hashPassword = hash.hashing.hashPassword;
const checkPassword = hash.hashing.checkPassword;

//Webhook Functions
const webhook = require('./utils/web_logs.js');
const hook = webhook.web_logs.hook;
const Webhook = webhook.web_logs.Webhook;
const MessageBuilder = webhook.web_logs.MessageBuilder;

//add async
const async = require('async');

router.get('/register', (req, res, next) => {
	return res.render('register.ejs');
});
router.get('/login', (req, res, next) => {
    return res.render('login.ejs');
});

//create a logged_in page with a link to logout and pass a








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

router.get('/users/login', (req, res, next) => {
    const email = req.query.email;
    const password = req.query.password;
    async.waterfall([
        function(callback) {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Internal Error')
                } else {
                    if (result.length > 0) {
                        callback(null, result[0])
                    } else {
                        return res.status(404).send('User not found')
                    }
                }
            })
        },
        function(user, callback) {
            if (checkPassword(password, user.password)) {
                callback(null, user)
            } else {
                return res.status(401).send('Wrong password')
            }
        }
    ], function(err, user) {
        if (err) {
            console.log(err)
            return res.status(500).send('Internal Error')
        } else {
            return res.redirect('/underconst')
        }
    })
});


//create an underconstruction page
router.get('/underconst', (req, res, next) => {
    return res.render('underconst.ejs');
});

module.exports = router;


