// Name Validator
// Make sure user names are valid

// Import basic Str validator
const BasicStrValidator = require("./basicstrvalidator.validator");

class NameValidator extends BasicStrValidator
{
    static NAME_REGEX = new RegExp("^[A-Za-z\\s.,:;]+$");

    static isValidName(str)
    {
        return BasicStrValidator.validateStr(str) && NameValidator.NAME_REGEX.test(str);
    }
}

module.exports = NameValidator;