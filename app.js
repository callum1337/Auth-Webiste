const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.resolve(__dirname, "", "templates")));





//ratelimit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});
app.use('/auth/api/users',limiter);



const index = require('./backend/routes');
app.use('/', index);




app.listen(80, () => {
    console.log('listening on port 80')
})
app.listen(443, () => {
    console.log('listening on port 443')
})


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`)
    next()
})

