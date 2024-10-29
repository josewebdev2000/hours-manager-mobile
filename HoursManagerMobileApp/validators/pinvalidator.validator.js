// PIN Validator
// Check if current pin is actually valid
import BasicStrValidator from "./basicstrvalidator.validator";

class PinValidator extends BasicStrValidator
{
    static PIN_REGEX = /^\d{6}$/;

    static isValidPin(str)
    {
        return BasicStrValidator.validateStr(str) && PinValidator.PIN_REGEX.test(str);
    }
}

export default PinValidator;