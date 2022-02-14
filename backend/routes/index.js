const express = require('express');
const router = express.Router();
const path = require('path');



router.use("/auth", require("./auth/auth.js"));
router.use("/", require("./non-auth/under-const.js"));
module.exports = router;



