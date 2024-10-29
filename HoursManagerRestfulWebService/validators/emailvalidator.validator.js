// Email Validator
// Make sure emails are valid thanks

// Import Basic Str Validator
const BasicStrValidator = require("./basicstrvalidator.validator");

class EmailValidator extends BasicStrValidator
{
    static EMAIL_REGEX = new RegExp("^[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$");

    static isValidEmail(str)
    {
        return BasicStrValidator.validateStr(str) && EmailValidator.EMAIL_REGEX.test(str);
    }
}

module.exports = EmailValidator;