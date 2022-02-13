//router.get router.post and router.get methods from app.js
const express = require('express');
const router = express.Router();
const connection = require('./connect_sql.js');



router.get('/register', (req, res, next) => {
	return res.render('register.ejs');
});



//GET OBJECTS
router.get('/users', function(req, res) {
    var apikey = req.query.apikey
    if (apikey == 'secret') {
        connection.query('SELECT * FROM users', function(err, result) {
            if (err) throw err;
            res.send(result)
        })
    } else {
        res.status(401).send('Unauthorized')
    }
})
router.get('/users/:id', function(req, res) {
    var apikey = req.query.apikey
    if (apikey == 'secret') {
        var id = req.params.id
        connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, result) {
            if (err) throw err;
            res.send(result)
        })
    } else {
        res.status(401).send('Unauthorized')
    }
})
router.get('/users/username/:username', function(req, res) {
    var apikey = req.query.apikey
    if (apikey == 'secret') {
        var username = req.params.username
        connection.query('SELECT * FROM users WHERE username = ?', [username], function(err, result) {
            if (err) throw err;
            res.send(result)
        })
    } else {
        res.status(401).send('Unauthorized')
    }
})
router.get('/users/email/:email', function(req, res) {
    var apikey = req.query.apikey
    if (apikey == 'secret') {
        var email = req.params.email
        connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, result) {
            if (err) throw err;
            res.send(result)
        })
    } else {
        res.status(401).send('Unauthorized')
    }
})

//POST OBJECTS
router.post('/users/add', function(req, res) {
        var user = req.body.user
        var password = req.body.password
        var email = req.body.email
        connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [user, email], function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.status(409).send('User already exists')
            } else {
                connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user, password, email], function(err, result) {
                    if (err) throw err;
                    res.status(201).send('User created')
                })
            }
        })
})




module.exports = router;


