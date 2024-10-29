// URL Validator
// Make sure URLs are valid

const BasicStrValidator = require("./basicstrvalidator.validator");

class UrlValidator extends BasicStrValidator
{
    static isValidUrl(str)
    {
        try
        {
            new URL(str);
            return true;
        }

        catch
        {
            return false;
        }
    }
}

module.exports = UrlValidator;