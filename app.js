const express = require('express')
const auth = require('basic-auth')
const app = express()
const bodyParser = require('body-parser')
var users = {}
const connection = require('./backend/connect_sql.js')
const ejs = require('ejs');
const path = require('path');
const http = require('http');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, 'templates')));




const index = require('./backend/endpoints');
app.use('/', index);



//listen to 3000
app.listen(3000, () => {
    console.log('listening on port 3000')
})


setInterval(function() {
    connection.query('SELECT * FROM users', function(err, result) {
        if (err) throw err;
        users = result
        console.log(users)
    });
}, 10000);



