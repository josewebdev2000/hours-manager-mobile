// Basic Str Validator
// Ensure the string is not null or has a length of at least 1
class BasicStrValidator
{
    static validateStr(str)
    {
        if (str == null)
        {
            return false;
        }

        return str.trim().length > 0;
    }
}

export default BasicStrValidator;