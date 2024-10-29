// URL Validator
// Make sure URLs are valid

import BasicStrValidator from "./basicstrvalidator.validator";

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

export default UrlValidator;