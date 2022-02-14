const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.resolve(__dirname, "", "templates")));




const index = require('./backend/routes');
app.use('/', index);



//listen to 3000
app.listen(3000, () => {
    console.log('listening on port 3000')
})




