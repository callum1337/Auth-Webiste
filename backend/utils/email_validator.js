const emailValidator = require('email-validator');

function validateEmail(email) {
    return emailValidator.validate(email);
}

module.exports.emailValidator = {
    validateEmail
}