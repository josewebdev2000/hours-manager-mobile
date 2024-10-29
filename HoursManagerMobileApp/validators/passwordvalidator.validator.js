// Password Validator
// Make sure passwords are valid

// Import BasicStrValidator
import BasicStrValidator from "./basicstrvalidator.validator";

class PasswordValidator extends BasicStrValidator
{
    static PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$");

    static isValidPassword(str)
    {
        return BasicStrValidator.validateStr(str) && PasswordValidator.PASSWORD_REGEX.test(str);
    }
}

export default PasswordValidator;