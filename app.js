const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(function(req, res, next) {res.header("Access-Control-Allow-Origin", "*");res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");next();});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "", "templates")));
app.use(express.json({limit:'50000mb'}))
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});

app.use('/auth/users', limiter);
const index = require('./backend/routes');
app.use('/', index);

app.listen(80, () => {
    console.log('listening on port 80')
})


//log each request and the time taken to complete it
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });
    next();
});

