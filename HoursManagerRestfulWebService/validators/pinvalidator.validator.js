// PIN Validator
// Make sure it is formed by 6 digits

const BasicStrValidator = require("./basicstrvalidator.validator");

class PinValidator extends BasicStrValidator
{
    static PIN_REGEX = /^\d{6}$/;

    static isValidPin(str)
    {
        return BasicStrValidator.validateStr(str) && PinValidator.PIN_REGEX.test(str);
    }
}

module.exports = PinValidator;