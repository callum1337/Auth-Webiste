const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
router.use(cors());


router.use(function(req, res, next) {res.header("Access-Control-Allow-Origin", "*");res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");next();});
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(express.static(path.resolve(__dirname, "", "templates")));
router.use(express.json({limit:'50000mb'}))

router.use("/auth", require("./auth/auth.js"));
router.use("/auth", require("./auth/api.js"));
router.use("/", require("./non-auth/under-const.js"));
router.use(cors());
module.exports = router;

//handle 404
router.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


