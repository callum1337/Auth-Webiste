const bcrypt = require('bcrypt');
const saltRounds = 10;



//create hashing and password checking function
function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

//check if password is correct
function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}


module.exports.hashing = {
    hashPassword,
    checkPassword
}