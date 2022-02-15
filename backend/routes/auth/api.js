//Express
const express = require('express');
const router = express.Router();
const connection = require('../../utils/connect_sql.js');
const expressBrute = require('express-brute');
const async = require('async');
//Hashing
const hash = require('../../utils/hashing.js');
const hashPassword = hash.hashing.hashPassword;
const checkPassword = hash.hashing.checkPassword;
//Webhook Functions
const webhook = require('../../utils/web_logs.js');
const hook = webhook.web_logs.hook;
const Webhook = webhook.web_logs.Webhook;
const MessageBuilder = webhook.web_logs.MessageBuilder;
//Validation
const validator = require('../../utils/email_validator.js');
const validate = validator.emailValidator.validateEmail;


router.post('/users/register',  function(req, res) {
    console.log(req.body);
    const user = req.body.user
    const password = req.body.password
    const email = req.body.email
    const password_hashed = hashPassword(password);
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long')
    }
    if (user.length < 3) {
        return res.status(400).send('Username must be at least 3 characters long')
    }
    //make
    async.waterfall([
        function(callback) {
            connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [user, email], function(err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Internal Error')
                } else{
                    if (result.length > 0) {
                        res.status(409).send('User already exists')
                    } else {
                        callback(null, user, password_hashed, email)
                    }
                }
            })
        },
        function(user, password_hashed, email, callback) {
            connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user, password_hashed, email], function(err) {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Internal Error')
                } else {
                    callback(null, user)
                }
            })
        },
        function(user, callback) {
            connection.query('SELECT * FROM users WHERE username = ?', [user], function(err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Internal Error')
                } else {
                    callback(null, result[0])
                }
            })
        }
    ], function(err) {
        if (err) {
            console.log(err)
            return res.status(500).send('Internal Error')
        } else {
            res.status(200).send('User created')
        }
    })
});
router.post('/users/login',  (req, res) => {
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
            console.log(user)
            return res.redirect('/underconst')
        }
    })
});


module.exports = router;
